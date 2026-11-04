"""Decode exported ASTC textures (named .pvr in this game's cache) into PNG.

Only reads exported files, never alters originals. Dependencies:
  python -m pip install Pillow texture2ddecoder
Usage:
  python tools/convert-textures.py [recovered/remote] [recovered/previews]
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
import texture2ddecoder

ASTC_MAGIC = b"\x13\xab\xa1\x5c"
BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"


def decode_uuid(value: str) -> str:
    if len(value) != 22:
        return value
    result = value[:2]
    for i in range(2, 22, 2):
        left, right = BASE64.index(value[i]), BASE64.index(value[i + 1])
        result += f"{left >> 2:x}{((left & 3) << 2) | (right >> 4):x}{right & 15:x}"
    return "-".join([result[:8], result[8:12], result[12:16], result[16:20], result[20:]])


def crop_sprites(source: Path, output: Path, texture_records: list[dict], package: Path | None, downloads: Path | None) -> dict:
    # Asset references in a Cocos packed import use their own shared UUID table.
    textures = {}
    for record in texture_records:
        uuid = Path(record["source"]).name.split(".")[0]
        textures[uuid] = output / record["png"]
    for path in source.rglob("*.png"):
        textures[path.name.split(".")[0]] = path
    if package and package.exists():
        for path in package.rglob("*.png"):
            textures[path.name.split(".")[0]] = path
    if downloads and downloads.exists():
        for path in downloads.rglob("*.png"):
            textures[path.name.split(".")[0]] = path
    records, missing, errors = [], [], []
    image_cache = {}
    configs = list(source.rglob("config*.json"))
    if package and package.exists():
        configs += list(package.rglob("config*.json"))
    # Cocos moves shared assets into another bundle and leaves UUID aliases.
    # Recover original paths even when the owning bundle has no path entry.
    aliases = {}
    for config_path in configs:
        try:
            config = json.loads(config_path.read_text(encoding="utf-8"))
        except (ValueError, UnicodeError):
            continue
        if not isinstance(config, dict) or "paths" not in config or "uuids" not in config:
            continue
        for asset_id, path_info in config["paths"].items():
            uuid = decode_uuid(config["uuids"][int(asset_id)])
            alias = {"bundle": config.get("name", config_path.parent.name), "path": path_info[0]}
            if alias not in aliases.setdefault(uuid, []):
                aliases[uuid].append(alias)
    for config_path in configs:
        try:
            config = json.loads(config_path.read_text(encoding="utf-8"))
        except (ValueError, UnicodeError):
            continue
        if not isinstance(config, dict) or "packs" not in config or "paths" not in config:
            continue
        bundle = config.get("name", config_path.parent.name)
        for packid, global_ids in config["packs"].items():
            packs = list((config_path.parent / config.get("importBase", "import")).rglob(f"{packid}*.json"))
            for pack_path in packs:
                pack = json.loads(pack_path.read_text(encoding="utf-8"))
                if not isinstance(pack, list) or len(pack) != 6 or not isinstance(pack[5], list):
                    continue
                for index, record in enumerate(pack[5]):
                    if not (isinstance(record, list) and record and isinstance(record[0], list)
                            and len(record[0]) == 1 and isinstance(record[0][0], dict)
                            and "rect" in record[0][0] and len(record) == 6 and record[5]):
                        continue
                    metadata = record[0][0]
                    refs = record[5]
                    if not all(isinstance(x, int) and 0 <= x < len(pack[1]) for x in refs):
                        continue
                    texture_uuid = decode_uuid(pack[1][refs[0]])
                    asset_uuid = decode_uuid(config["uuids"][global_ids[index]])
                    frame_aliases = aliases.get(asset_uuid, [])
                    best_alias = next((a for a in frame_aliases if a["path"].startswith("Texture/Element/")), next(iter(frame_aliases), None))
                    fallback = best_alias["path"] if best_alias else metadata.get("name", f"frame{index}")
                    resource_path = config["paths"].get(str(global_ids[index]), [fallback])[0]
                    source_texture = textures.get(texture_uuid)
                    if source_texture is None:
                        missing.append({"bundle": bundle, "path": resource_path, "textureUuid": texture_uuid, "assetUuid": asset_uuid, "aliases": frame_aliases})
                        continue
                    try:
                        if source_texture not in image_cache:
                            image_cache[source_texture] = Image.open(source_texture).convert("RGBA")
                        atlas = image_cache[source_texture]
                        x, y, width, height = metadata["rect"]
                        rotated = bool(metadata.get("rotated", False))
                        rect_width, rect_height = (height, width) if rotated else (width, height)
                        if x < 0 or y < 0 or x + rect_width > atlas.width or y + rect_height > atlas.height:
                            raise ValueError(f"frame outside {atlas.size}: {metadata['rect']}, rotated={rotated}")
                        image = atlas.crop((x, y, x + rect_width, y + rect_height))
                        # TexturePacker packs clockwise; restore by rotating counterclockwise.
                        if rotated:
                            image = image.transpose(Image.Transpose.ROTATE_90)
                        original_width, original_height = metadata.get("originalSize", image.size)
                        if original_width > 8192 or original_height > 8192:
                            raise ValueError("originalSize too large")
                        offset_x, offset_y = metadata.get("offset", [0, 0])
                        padded = Image.new("RGBA", (original_width, original_height))
                        left = round((original_width - image.width) / 2 + offset_x)
                        top = round((original_height - image.height) / 2 - offset_y)
                        padded.paste(image, (left, top))
                        safe_parts = [re.sub(r'[<>:"|?*]', "_", part) for part in Path(resource_path).parts]
                        if any(part in ("", ".", "..") for part in safe_parts):
                            raise ValueError("unsafe resource path")
                        relative = Path("sprites") / bundle / Path(*safe_parts).with_suffix(".png")
                        destination = output / relative
                        destination.parent.mkdir(parents=True, exist_ok=True)
                        padded.save(destination)
                        records.append({"bundle": bundle, "path": resource_path, "png": relative.as_posix(),
                                        "textureUuid": texture_uuid, "metadata": metadata,
                                        "assetUuid": asset_uuid, "aliases": frame_aliases,
                                        "width": padded.width, "height": padded.height})
                    except Exception as error:
                        errors.append({"bundle": bundle, "path": resource_path, "error": str(error)})
    manifest = {"converted": len(records), "missingTextures": len(missing), "failed": len(errors),
                "files": records, "missing": missing, "errors": errors}
    (output / "sprites.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    main_items = [record for record in records if record["path"].startswith("Texture/Element/")]
    if main_items:
        contact_sheet(main_items, output, prefix="items-sheet")
    return {"sprites": len(records), "missingTextures": len(missing), "spriteErrors": len(errors)}


def convert(source: Path, target: Path) -> dict:
    data = source.read_bytes()
    if len(data) < 16 or data[:4] != ASTC_MAGIC:
        raise ValueError("not a raw ASTC texture")
    bx, by, bz = data[4:7]
    width = int.from_bytes(data[7:10], "little")
    height = int.from_bytes(data[10:13], "little")
    depth = int.from_bytes(data[13:16], "little")
    if bz != 1 or depth != 1 or not 1 <= width <= 8192 or not 1 <= height <= 8192:
        raise ValueError(f"unsupported dimensions/block: {width}x{height}x{depth}, {bx}x{by}x{bz}")
    expected = ((width + bx - 1) // bx) * ((height + by - 1) // by) * 16
    if len(data) != expected + 16:
        raise ValueError(f"ASTC byte length mismatch: expected {expected + 16}, got {len(data)}")
    decoded = texture2ddecoder.decode_astc(data[16:], width, height, bx, by)
    # texture2ddecoder returns BGRA, whereas Pillow's destination mode is RGBA.
    image = Image.frombytes("RGBA", (width, height), decoded, "raw", "BGRA")
    target.parent.mkdir(parents=True, exist_ok=True)
    image.save(target)
    return {
        "width": width, "height": height, "format": "ASTC",
        "block": [bx, by, bz], "sourceSha256": hashlib.sha256(data).hexdigest(),
        "pngSha256": hashlib.sha256(target.read_bytes()).hexdigest(),
    }


def contact_sheet(entries: list[dict], directory: Path, prefix: str = "contact-sheet") -> None:
    """Small labelled overview, split into pages to keep file sizes reasonable."""
    cell_width, cell_height, columns, rows = 160, 176, 8, 8
    for page_start in range(0, len(entries), columns * rows):
        page = entries[page_start:page_start + columns * rows]
        sheet = Image.new("RGB", (columns * cell_width, rows * cell_height), "#e9e1d1")
        draw = ImageDraw.Draw(sheet)
        for number, entry in enumerate(page, page_start):
            x = ((number - page_start) % columns) * cell_width
            y = ((number - page_start) // columns) * cell_height
            preview = Image.open(directory / entry["png"]).convert("RGBA")
            preview.thumbnail((cell_width - 12, cell_height - 38))
            sheet.paste(preview, (x + (cell_width - preview.width) // 2, y + 5), preview)
            draw.text((x + 6, y + cell_height - 32), f"{number:03d}: {entry['width']}x{entry['height']}", fill="#342a25")
            draw.text((x + 6, y + cell_height - 18), Path(entry.get("source", entry.get("path", ""))).name[:21], fill="#342a25")
        sheet.save(directory / f"{prefix}-{page_start // (columns * rows) + 1:02d}.jpg", quality=90)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", nargs="?", type=Path, default=Path("recovered/remote"))
    parser.add_argument("output", nargs="?", type=Path, default=Path("recovered/previews"))
    parser.add_argument("--contact-sheets", action="store_true")
    parser.add_argument("--sprites", action="store_true", help="crop cached Cocos SpriteFrames into named PNG files")
    parser.add_argument("--packages", type=Path, default=Path("recovered/packages"))
    parser.add_argument("--downloads", type=Path, default=Path("recovered/downloads"))
    args = parser.parse_args()
    source = args.source.resolve(strict=True)
    output = args.output.resolve()
    if output == source or source in output.parents:
        raise ValueError("output must be outside the original exported resource directory")
    output.mkdir(parents=True, exist_ok=True)
    records, errors = [], []
    texture_sources = [(file, file.relative_to(source)) for file in sorted(source.rglob("*.pvr"))]
    if args.packages.exists():
        texture_sources += [(file, Path("packages") / file.relative_to(args.packages)) for file in sorted(args.packages.rglob("*.pvr"))]
    if args.downloads.exists():
        texture_sources += [(file, Path("downloads") / file.relative_to(args.downloads)) for file in sorted(args.downloads.rglob("*.pvr"))]
    for file, relative in texture_sources:
        png = relative.with_suffix(".png")
        try:
            record = convert(file, output / png)
            records.append({"source": relative.as_posix(), "png": png.as_posix(), **record})
        except Exception as error:
            errors.append({"source": relative.as_posix(), "error": str(error)})
    manifest = {"format": "ASTC decoded to RGBA PNG; orientation unchanged", "converted": len(records), "failed": len(errors), "files": records, "errors": errors}
    (output / "textures.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    if args.contact_sheets and records:
        contact_sheet(records, output)
    sprite_summary = crop_sprites(source, output, records, args.packages, args.downloads) if args.sprites else {}
    print(json.dumps({"converted": len(records), "failed": len(errors), "output": str(output), **sprite_summary}, ensure_ascii=False))
    if errors:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
