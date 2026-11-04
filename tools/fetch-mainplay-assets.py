"""Fetch missing ordinary main-board textures from the game's static public CDN.

Uses exported Cocos bundle manifests, with no login, game APIs, or runtime code.
Default maximum 150 MiB; at most six concurrent GETs; originals remain unchanged.
"""

from __future__ import annotations
import argparse
from concurrent.futures import ThreadPoolExecutor
import hashlib
import importlib.util
import json
from pathlib import Path
import re
import threading
import urllib.error
import urllib.parse
import urllib.request

HOST = "gj-fejsf-res.hortorgames.com"
BASE = f"https://{HOST}/asset/remote/"
SERIES = re.compile(r"[A-I]_\d+|Coin|Diamond|Energy|Exp|Bag|Store|Scene_\d+|Prop_\d+|Chest_(?:Energy1?|Coin|Pig|Blue|Red|Gray|Green)")
UI_PREFIXES = ("Texture/MergeUi/", "Texture/UI/MainBoard/", "Texture/Map/init/", "Texture/UI/Home/", "Texture/Items/Common/")


def selected(path: str) -> bool:
    parts = path.split("/")
    return path.startswith(UI_PREFIXES) or (path.startswith("Texture/Element/") and bool(SERIES.fullmatch(parts[2])))


class StaticOnlyRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        validate_url(newurl)
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def validate_url(url: str) -> None:
    parsed = urllib.parse.urlsplit(url)
    if parsed.scheme != "https" or parsed.hostname != HOST or parsed.port not in (None, 443):
        raise ValueError("only the known game static CDN over HTTPS is allowed")
    if not parsed.path.startswith("/asset/remote/") or parsed.query or parsed.fragment:
        raise ValueError("only static game asset paths without query strings are allowed")
    if any(p in (".", "..") for p in parsed.path.split("/")):
        raise ValueError("unsafe URL path")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path("recovered"))
    parser.add_argument("--max-mib", type=int, default=150)
    parser.add_argument("--workers", type=int, default=6)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    root = args.root.resolve(strict=True)
    output = root / "downloads"
    output.mkdir(parents=True, exist_ok=True)
    spec = importlib.util.spec_from_file_location("texture_converter", Path(__file__).with_name("convert-textures.py"))
    converter = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(converter)
    index = json.loads((root / "previews/sprites.json").read_text(encoding="utf-8"))
    needed = {(e["bundle"], e["textureUuid"]): [] for e in index["missing"] if selected(e["path"])}
    for entry in index["missing"]:
        key = (entry["bundle"], entry["textureUuid"])
        if key in needed and selected(entry["path"]):
            needed[key].append(entry["path"])
    candidates = []
    unresolved = []
    for config_path in sorted((root / "remote").rglob("config*.json")):
        config = json.loads(config_path.read_text(encoding="utf-8"))
        if not isinstance(config, dict) or "uuids" not in config:
            continue
        bundle = config.get("name", config_path.parent.name)
        version_list = config.get("versions", {}).get("native", [])
        versions = dict(zip(version_list[::2], version_list[1::2]))
        for asset_id, compressed_uuid in enumerate(config["uuids"]):
            uuid = converter.decode_uuid(compressed_uuid)
            key = (bundle, uuid)
            if key not in needed:
                continue
            if asset_id not in versions:
                unresolved.append({"bundle": bundle, "textureUuid": uuid, "reason": "no native version"})
                continue
            candidates.append({"bundle": bundle, "textureUuid": uuid, "version": versions[asset_id], "sprites": needed[key]})
    planned = {"selectedSprites": sum(len(e["sprites"]) for e in candidates), "textures": len(candidates), "maxBytes": args.max_mib * 1024 * 1024, "files": candidates, "unresolved": unresolved}
    (output / "plan.json").write_text(json.dumps(planned, ensure_ascii=False, indent=2), encoding="utf-8")
    if args.dry_run:
        print(json.dumps({k: planned[k] for k in ("selectedSprites", "textures", "maxBytes")}))
        return
    lock = threading.Lock()
    existing_bytes = sum(path.stat().st_size for path in output.rglob("*") if path.suffix in (".png", ".pvr"))
    totals = {"bytes": existing_bytes}
    max_bytes = args.max_mib * 1024 * 1024

    def fetch(entry: dict) -> dict:
        uuid, version, bundle = entry["textureUuid"], entry["version"], entry["bundle"]
        errors = []
        opener = urllib.request.build_opener(StaticOnlyRedirect())
        for extension in ("pvr", "png"):
            relative = Path("asset/remote") / bundle / "native" / uuid[:2] / f"{uuid}.{version}.{extension}"
            url = "https://" + HOST + "/" + relative.as_posix()
            validate_url(url)
            destination = output / relative
            try:
                if destination.exists():
                    data = destination.read_bytes()
                    return {**entry, "url": url, "path": relative.as_posix(), "bytes": len(data), "sha256": hashlib.sha256(data).hexdigest(), "status": "reused"}
                with opener.open(urllib.request.Request(url, headers={"User-Agent": "MainplayAssetRecovery/1.0"}), timeout=20) as response:
                    validate_url(response.geturl())
                    chunks = []
                    size = 0
                    while True:
                        chunk = response.read(65536)
                        if not chunk:
                            break
                        with lock:
                            if totals["bytes"] + len(chunk) > max_bytes:
                                raise ValueError("download budget reached")
                            totals["bytes"] += len(chunk)
                        size += len(chunk)
                        if size > 16 * 1024 * 1024:
                            raise ValueError("individual asset exceeds 16 MiB")
                        chunks.append(chunk)
                    data = b"".join(chunks)
                if not (data.startswith(b"\x13\xab\xa1\x5c") or data.startswith(b"\x89PNG\r\n\x1a\n")):
                    raise ValueError("unexpected texture format")
                destination.parent.mkdir(parents=True, exist_ok=True)
                temporary = destination.with_suffix(destination.suffix + ".part")
                temporary.write_bytes(data)
                temporary.replace(destination)
                return {**entry, "url": url, "path": relative.as_posix(), "bytes": len(data), "sha256": hashlib.sha256(data).hexdigest(), "status": "downloaded"}
            except Exception as error:
                errors.append({"url": url, "error": str(error)})
                if not isinstance(error, urllib.error.HTTPError) or error.code != 404:
                    break
        return {**entry, "status": "failed", "errors": errors}

    with ThreadPoolExecutor(max_workers=max(1, min(6, args.workers))) as executor:
        records = list(executor.map(fetch, candidates))
    prior = output / "manifest.json"
    previous_records = json.loads(prior.read_text(encoding="utf-8")).get("files", []) if prior.exists() else []
    combined = {(entry["bundle"], entry["textureUuid"]): entry for entry in previous_records}
    combined.update({(entry["bundle"], entry["textureUuid"]): entry for entry in records})
    all_records = list(combined.values())
    manifest = {"host": HOST, "scope": "ordinary A-I mainboard chains, common props/pickups/chests, MergeUi/MainBoard/Home/init-room/Common UI", "maximumBytes": max_bytes, "transferredBytes": totals["bytes"], "transferredThisRun": totals["bytes"] - existing_bytes, "downloaded": sum(e["status"] == "downloaded" for e in all_records), "reused": sum(e["status"] == "reused" for e in all_records), "failed": sum(e["status"] == "failed" for e in all_records), "files": all_records, "unresolved": unresolved}
    (output / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({k: manifest[k] for k in ("downloaded", "reused", "failed", "transferredBytes")}))


if __name__ == "__main__":
    main()
