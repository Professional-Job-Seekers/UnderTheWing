import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';

const base = process.env.PAGES_BASE_PATH || '/UnderTheWing/';
const output = resolve('build-pages');

test('Pages HTML references existing assets under the repository base', async () => {
  const html = await readFile(resolve(output, 'index.html'), 'utf8');
  const assets = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(match => match[1]);
  assert.ok(assets.some(path => path.endsWith('.js')), 'Must contain a built JS entry point');
  assert.ok(assets.some(path => path.endsWith('.css')), 'Must contain a built stylesheet');
  for (const asset of assets) {
    assert.ok(asset.startsWith(base), `Asset must stay under ${base}: ${asset}`);
    await access(resolve(output, asset.slice(base.length)));
  }
  assert.ok(!html.includes('/src/index.jsx'), 'Must publish compiled output, not source');
});

test('Pages manifest icons resolve alongside the manifest', async () => {
  const manifest = JSON.parse(await readFile(resolve(output, 'manifest.json'), 'utf8'));
  for (const icon of manifest.icons) await access(resolve(output, icon.src));
  assert.equal(manifest.start_url, '.');
});
