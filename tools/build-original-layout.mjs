import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { parse } from 'acorn';

// Development-only preparation. The playable server itself requires only Node
// built-ins and this verified layout; it never parses or evaluates game code.
const root = path.resolve(import.meta.dirname, '..');
const relative = 'client/subpackages/main/game.js';
const source = fs.readFileSync(path.join(root, relative), 'utf8');
const ast = parse(source, { ecmaVersion: 'latest' });
let wrapper;
const pending = [ast];
while (pending.length) {
  const node = pending.pop();
  if (node.type === 'FunctionExpression' && (!wrapper || node.end - node.start > wrapper.end - wrapper.start)) wrapper = node;
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) for (const child of value) if (child?.type) pending.push(child);
    if (value?.type) pending.push(value);
  }
}
if (!wrapper || wrapper.end - wrapper.start < 1_000_000) throw new Error('Expected original client closure');
const layout = {
  version: 1,
  source: relative,
  sha256: crypto.createHash('sha256').update(source).digest('hex'),
  utf16Length: source.length,
  insertionOffset: wrapper.body.end - 1,
  method: 'Acorn statically locates the final body brace of the original outer gameplay closure. Runtime verifies the entire source SHA-256 before inserting bridge exports.',
};
fs.writeFileSync(path.join(root, 'original/runtime-layout.json'), JSON.stringify(layout, null, 2) + '\n');
console.log(JSON.stringify({ source: relative, sha256: layout.sha256, insertionOffset: layout.insertionOffset }));
