#!/usr/bin/env node
// Vets npm packages before they are trusted (rule: dependency-security.md). An AI agent can add a typosquat or a days-old malicious package without noticing;
// this reads the registry facts that tell them apart from a maintained library and exits 1 when a package looks wrong.
//
//   node scripts/dep-vet.mjs <name>...                     print the facts and flags for these packages
//   node scripts/dep-vet.mjs --base origin/main            vet the packages package.json adds compared with that ref (what CI runs)
//   --approved "a,b"  or  --pr-body "$PR_BODY"             packages the owner approved (a PR body line "Dependency approval: a, b")
// Blocks: not on the registry, first published under 30 days ago, under 1000 weekly downloads, a name within 2 edits of a popular or an existing package.
// Warns: install scripts, no repository, no license. An approved package still prints its flags. Replaces a paid scanner for the new-package case only;
// known advisories are npm audit and dependency review (dependency-scan.yml).
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const MIN_AGE_DAYS = 30;
export const MIN_WEEKLY_DOWNLOADS = 1000;
// Popular names that typosquats imitate. Not exhaustive: it widens the net beyond the packages already in the tree.
export const POPULAR = ['react', 'react-dom', 'react-router', 'react-router-dom', 'react-datepicker', 'lodash', 'underscore', 'express', 'axios', 'moment', 'dayjs', 'date-fns', 'chalk', 'commander', 'debug', 'dotenv', 'uuid', 'zod', 'yup', 'joi', 'vue', 'next', 'vite', 'webpack', 'typescript', 'eslint', 'prettier', 'jest', 'vitest', 'mocha', 'playwright', 'puppeteer', 'cors', 'body-parser', 'jsonwebtoken', 'bcrypt', 'bcryptjs', 'mongoose', 'sequelize', 'prisma', 'pg', 'mysql', 'mysql2', 'redis', 'ioredis', 'socket.io', 'ws', 'node-fetch', 'cross-env', 'rimraf', 'glob', 'minimist', 'yargs', 'semver', 'tailwindcss', 'zustand', 'redux', 'rxjs', 'framer-motion', 'recharts', 'd3', 'xlsx', 'sharp', 'nodemailer', 'stripe', 'firebase', 'web-push', 'kysely', 'better-auth'];

/** Edit distance between two names (insert, delete, substitute, swap of neighbours counts as 1). */
export function distance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) {
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
  }
  return d[a.length][b.length];
}

/** Names this one imitates: within 2 edits (1 for names up to 5 letters; none up to 3, where every name is near another) of a different popular or existing name.
 *  A scoped name (@scope/pkg) is only compared with other scoped names, as a whole, and @types/* is skipped: the scope itself is the claim, and @types/x beside x is normal. */
export function lookalikes(name, others = []) {
  const scoped = name.startsWith('@');
  if (name.startsWith('@types/')) return [];
  const subject = scoped ? name : name;
  if (subject.length <= 3) return [];
  const limit = subject.length <= 5 ? 1 : 2;
  return [...new Set([...POPULAR, ...others])].filter(o => o !== name && o.startsWith('@') === scoped && !o.startsWith('@types/') && distance(subject, o) <= limit);
}

/** Packages in `head` that `base` does not have, from the dependency fields of two package.json objects. */
export function addedPackages(base, head, fields = ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']) {
  const names = pkg => new Set(fields.flatMap(f => Object.keys(pkg?.[f] ?? {})));
  const before = names(base);
  return [...names(head)].filter(n => !before.has(n)).sort();
}

/** The owner's approvals from a PR body line "Dependency approval: a, b". */
export function approvals(text = '') {
  const m = /^Dependency approval:[ \t]*(.+)$/im.exec(text);
  return m ? m[1].split(/[,\s]+/).map(s => s.trim()).filter(Boolean) : [];
}

/** Flags for one package from its registry facts: { block: [...], warn: [...] }. `facts` null means the registry does not know the name. */
export function judge(name, facts, others = [], now = Date.now()) {
  const block = [], warn = [];
  if (!facts) return { block: ['not on the registry (a made-up name, or dependency confusion)'], warn };
  const age = facts.created ? (now - Date.parse(facts.created)) / 86_400_000 : null;
  if (age !== null && age < MIN_AGE_DAYS) block.push(`first published ${Math.floor(age)} days ago (under ${MIN_AGE_DAYS})`);
  if (facts.weeklyDownloads !== null && facts.weeklyDownloads < MIN_WEEKLY_DOWNLOADS) block.push(`${facts.weeklyDownloads} downloads last week (under ${MIN_WEEKLY_DOWNLOADS})`);
  const near = lookalikes(name, others);
  // A real package with a similar name (vitest beside vite) is old and widely used; an imitation is young or barely downloaded.
  const established = age !== null && age >= 365 && (facts.weeklyDownloads === null || facts.weeklyDownloads >= 100_000); // unknown downloads (the API said no) do not make a year-old package look new
  if (near.length) (established ? warn : block).push(`name is within a few edits of ${near.slice(0, 3).join(', ')}${established ? ' (old and widely used, so only a warning)' : ''}`);
  const scripts = ['preinstall', 'install', 'postinstall'].filter(s => facts.scripts?.[s]);
  if (scripts.length) warn.push(`runs ${scripts.join(', ')} at install: read it`);
  if (!facts.repository) warn.push('no repository linked');
  if (!facts.license) warn.push('no license declared');
  return { block, warn };
}

const registry = async (url, get) => { try { return await get(url); } catch { return undefined; } };
const jsonGet = async url => { const r = await fetch(url, { headers: { accept: 'application/json' } }); if (r.status === 404) return null; if (!r.ok) throw new Error(String(r.status)); return r.json(); };

/** Registry facts for one name; null when it does not exist, undefined when the registry could not be reached. */
export async function lookup(name, get = jsonGet) {
  const doc = await registry(`https://registry.npmjs.org/${name.replace('/', '%2F')}`, get);
  if (doc === undefined) return undefined;
  if (doc === null) return null;
  const latest = doc.versions?.[doc['dist-tags']?.latest] ?? {};
  const dlUrl = `https://api.npmjs.org/downloads/point/last-week/${name.replace('/', '%2F')}`;
  const dl = (await registry(dlUrl, get)) ?? (await registry(dlUrl, get)); // the downloads API rate-limits: one retry
  return { created: doc.time?.created ?? null, weeklyDownloads: typeof dl?.downloads === 'number' ? dl.downloads : null, scripts: latest.scripts ?? {}, repository: doc.repository ?? latest.repository ?? null, license: latest.license ?? doc.license ?? null };
}

async function main(argv) {
  const arg = n => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : undefined; };
  const git = (...a) => execFileSync('git', a, { encoding: 'utf8' });
  const readHead = () => JSON.parse(readFileSync('package.json', 'utf8'));
  const base = arg('--base');
  let names = argv.filter((a, i) => !a.startsWith('--') && !argv[i - 1]?.startsWith('--'));
  const head = readHead();
  const inTree = [...new Set(['dependencies', 'devDependencies', 'optionalDependencies'].flatMap(f => Object.keys(head[f] ?? {})))];
  if (base) {
    let before = {};
    try { before = JSON.parse(git('show', `${base}:package.json`)); } catch { /* new manifest: everything is added */ }
    names = addedPackages(before, head);
  }
  const approved = new Set([...(arg('--approved') ?? '').split(','), ...approvals(arg('--pr-body'))].map(s => s.trim()).filter(Boolean));
  if (!names.length) { console.log('dep-vet: no new packages.'); return 0; }
  let failed = 0;
  for (const name of names) {
    const facts = await lookup(name);
    if (facts === undefined) { console.log(`? ${name}: registry unreachable, not vetted`); failed++; continue; }
    const { block, warn } = judge(name, facts, inTree.filter(n => n !== name));
    const mark = block.length ? (approved.has(name) ? 'APPROVED' : 'BLOCK') : warn.length ? 'warn' : 'ok';
    console.log(`${mark.padEnd(8)} ${name}${facts ? `  (${facts.weeklyDownloads ?? '?'} weekly downloads, created ${facts.created?.slice(0, 10) ?? '?'})` : ''}`);
    for (const b of block) console.log(`           block: ${b}`);
    for (const w of warn) console.log(`           warn:  ${w}`);
    if (block.length && !approved.has(name)) failed++;
  }
  if (failed) console.log(`\ndep-vet: ${failed} package(s) need the owner's approval. Add "Dependency approval: <name>" to the PR description once checked.`);
  return failed ? 1 : 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main(process.argv.slice(2)).then(c => process.exit(c));
