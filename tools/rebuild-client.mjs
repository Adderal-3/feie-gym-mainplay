import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { parse } from 'acorn';

const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const slash = value => value.replaceAll('\\', '/');

function safeOutput(root, name) {
  if (typeof name !== 'string' || !name || name.includes('\0')) throw new Error('Invalid module path');
  const relative = slash(name).replace(/^\/+/, '');
  if (relative.split('/').some(part => part === '..' || part.includes(':'))) throw new Error(`Unsafe module path ${name}`);
  const output = path.resolve(root, relative);
  if (!output.startsWith(path.resolve(root) + path.sep)) throw new Error(`Module escapes client directory: ${name}`);
  return output;
}

function walk(root) {
  return fs.readdirSync(root, { withFileTypes: true }).flatMap(entry => {
    const filename = path.join(root, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Symbolic links are not supported: ${entry.name}`);
    return entry.isDirectory() ? walk(filename) : entry.isFile() ? [filename] : [];
  });
}

// Matches only package-module wrappers, never shader/AMD define calls.
// Parsing and slicing are static: recovered scripts are never imported or run.
export function extractModules(source) {
  const ast = parse(source, { ecmaVersion: 'latest', sourceType: 'script', allowHashBang: true });
  const modules = [];
  for (const statement of ast.body) {
    if (statement.type !== 'ExpressionStatement') continue;
    const call = statement.expression;
    if (call.type !== 'CallExpression' || call.callee.type !== 'Identifier' || call.callee.name !== 'define') continue;
    const [name, factory] = call.arguments;
    if (name?.type !== 'Literal' || typeof name.value !== 'string' || factory?.type !== 'FunctionExpression') continue;
    if (factory.async || factory.generator || factory.body.type !== 'BlockStatement') continue;
    if (factory.params.length !== 3 || !factory.params.every((param, index) => param.type === 'Identifier' && param.name === ['require', 'module', 'exports'][index])) continue;
    modules.push({ name: name.value, code: source.slice(factory.body.start + 1, factory.body.end - 1), wrapperStart: call.start, wrapperEnd: call.end, bodyStart: factory.body.start + 1, bodyEnd: factory.body.end - 1 });
  }
  return modules;
}

export function rebuildClient(packageRoot, clientRoot) {
  const root = path.resolve(packageRoot), outputRoot = path.resolve(clientRoot);
  if (!fs.existsSync(root)) throw new Error('Recovered package root does not exist');
  fs.mkdirSync(outputRoot, { recursive: true });
  const outputs = new Map();
  const manifest = {
    formatVersion: 1,
    rebuiltAt: new Date().toISOString(),
    method: 'Static Acorn parsing of top-level define(path, function(require,module,exports){...}) wrappers; source body slicing without evaluation.',
    limitation: 'Recovered compiled client layout only. Server source, uncached subpackages, remote bundles, original TypeScript, and original editor project are not reconstructed. Exporting does not execute or connect the original client.',
    inputs: [], files: [], ignoredJavaScript: [], missingSubpackages: [],
  };
  function write(relative, bytes, origin) {
    const target = safeOutput(outputRoot, relative), normalized = slash(path.relative(outputRoot, target));
    if (normalized === 'layout-index.json') throw new Error('Input conflicts with reserved manifest filename');
    const buffer = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
    const hash = sha256(buffer), existing = outputs.get(normalized.toLowerCase());
    if (existing) {
      if (existing.sha256 !== hash || existing.path !== normalized) throw new Error(`Conflicting client output: ${normalized}`);
      existing.origins.push(origin); return;
    }
    if (fs.existsSync(target)) {
      const prior = fs.readFileSync(target);
      if (sha256(prior) !== hash) throw new Error(`Refusing to overwrite differing existing client file: ${normalized}`);
    } else {
      fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, buffer);
    }
    const info = { path: normalized, bytes: buffer.length, sha256: hash, origins: [origin] };
    outputs.set(normalized.toLowerCase(), info); manifest.files.push(info);
  }

  // Each recovered package is packages/<version>/<package-stem>/<original-path>.
  const versions = fs.readdirSync(root, { withFileTypes: true }).filter(entry => entry.isDirectory()).sort((a, b) => Number(a.name) - Number(b.name));
  let appConfig = null, moduleCount = 0;
  for (const version of versions) {
    if (!/^\d+$/.test(version.name)) continue;
    const versionRoot = path.join(root, version.name);
    for (const bundle of fs.readdirSync(versionRoot, { withFileTypes: true }).filter(entry => entry.isDirectory())) {
      const bundleRoot = path.join(versionRoot, bundle.name);
      for (const filename of walk(bundleRoot).sort()) {
        const bytes = fs.readFileSync(filename), relativeInput = slash(path.relative(root, filename));
        const originalPath = slash(path.relative(bundleRoot, filename));
        const input = { path: relativeInput, bytes: bytes.length, sha256: sha256(bytes) };
        manifest.inputs.push(input);
        if (filename.endsWith('.js')) {
          const source = bytes.toString('utf8'), modules = extractModules(source);
          input.modules = modules.length;
          if (!modules.length) manifest.ignoredJavaScript.push({ path: relativeInput, reason: 'No exact top-level package module wrappers' });
          for (const module of modules) {
            write(module.name, module.code, { input: relativeInput, kind: 'module-body', utf16Start: module.bodyStart, utf16End: module.bodyEnd }); moduleCount++;
          }
        } else {
          if (originalPath === 'app-config.json') {
            const parsed = JSON.parse(bytes.toString('utf8'));
            if (appConfig && JSON.stringify(appConfig) !== JSON.stringify(parsed)) throw new Error('Conflicting recovered app-config.json files');
            appConfig = parsed;
          }
          write(originalPath, bytes, { input: relativeInput, kind: 'package-resource' });
        }
      }
    }
  }
  if (!appConfig) throw new Error('No recovered app-config.json found');
  const game = {};
  // app-config.json contains runtime annotations and a differently cased key.
  for (const key of ['deviceOrientation', 'openDataContext', 'networkTimeout', 'iOSHighPerformance', 'iOSHighPerformance+', 'navigateToMiniProgramAppIdList', 'gamePlugins', 'plugins']) {
    if (Object.hasOwn(appConfig, key)) game[key] = appConfig[key];
  }
  const subpackages = appConfig.subpackages ?? appConfig.subPackages ?? [];
  game.subpackages = subpackages.map(pkg => {
    const result = { name: pkg.name, root: String(pkg.root).replace(/^\/+|\/+$/g, '') + '/' };
    if (pkg.independent !== undefined) result.independent = pkg.independent;
    safeOutput(outputRoot, result.root + '__path_validation__');
    if (!outputs.has((result.root + 'game.js').toLowerCase())) manifest.missingSubpackages.push({ name: result.name, root: result.root });
    return result;
  });
  write('game.json', JSON.stringify(game, null, 2) + '\n', { kind: 'generated-native-config', input: 'app-config.json', removedFields: ['__warning__', 'subContext', 'subPackages[].meta'] });
  write('project.config.json', JSON.stringify({
    description: 'Recovered compiled client layout for local inspection; not a verified standalone game.',
    compileType: 'game', appid: 'touristappid', projectname: 'feie-gym-recovered-client',
    setting: { es6: false, minified: false },
    libVersion: 'latest',
  }, null, 2) + '\n', { kind: 'generated-local-project-config' });
  manifest.moduleCount = moduleCount;
  manifest.outputFileCount = manifest.files.length;
  manifest.files.sort((a, b) => a.path.localeCompare(b.path));
  fs.writeFileSync(path.join(outputRoot, 'layout-index.json'), JSON.stringify(manifest, null, 2) + '\n');
  return { modules: moduleCount, files: manifest.files.length, ignoredJavaScript: manifest.ignoredJavaScript.length, missingSubpackages: manifest.missingSubpackages, outputRoot };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [input = 'recovered/packages', output = 'client'] = process.argv.slice(2);
  console.log(JSON.stringify(rebuildClient(input, output), null, 2));
}
