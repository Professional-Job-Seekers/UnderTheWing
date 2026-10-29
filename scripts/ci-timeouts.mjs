#!/usr/bin/env node
// Fails when a GitHub Actions job has no `timeout-minutes`, or one above the ceiling without a reason (ci-budget.md).
// Usage: node scripts/ci-timeouts.mjs [workflows-dir] [--max=10]   (default dir: .github/workflows)
// A job that calls a reusable workflow (`uses:` at job level) is exempt: the called workflow's jobs carry their own.
// A value above the ceiling is allowed when the line, or the line above it, has `# timeout-ok: <why>`.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const DEFAULT_MAX = 10;

const stripComment = (s) => s.replace(/\s+#.*$/, '').trim();

// Returns [{ job, line, problem }] for one workflow file's text.
export function checkWorkflow(text, max = DEFAULT_MAX) {
  const lines = text.split(/\r?\n/);
  const problems = [];
  let start = lines.findIndex((l) => /^jobs:\s*(#.*)?$/.test(l));
  if (start < 0) return problems;
  const jobs = []; // { name, line, from, to }
  for (let i = start + 1; i < lines.length; i++) {
    const l = lines[i];
    if (/^\S/.test(l) && !l.startsWith('#')) {
      if (jobs.length) jobs[jobs.length - 1].to = i;
      break;
    }
    const m = /^ {2}([A-Za-z0-9_-]+):\s*(#.*)?$/.exec(l);
    if (m) {
      if (jobs.length) jobs[jobs.length - 1].to = i;
      jobs.push({ name: m[1], line: i + 1, from: i + 1, to: lines.length });
    }
  }
  for (const j of jobs) {
    const block = lines.slice(j.from, j.to);
    if (block.some((l) => /^ {4}uses:/.test(l))) continue;
    const idx = block.findIndex((l) => /^ {4}timeout-minutes:/.test(l));
    if (idx < 0) {
      problems.push({ job: j.name, line: j.line, problem: 'no timeout-minutes' });
      continue;
    }
    const raw = block[idx];
    const value = stripComment(raw.replace(/^ {4}timeout-minutes:/, '')).replace(/^['"]|['"]$/g, '');
    if (!/^\d+$/.test(value)) continue; // an expression such as ${{ inputs.minutes }}: cannot be checked
    const prev = idx > 0 ? block[idx - 1] : lines[j.from - 1];
    const ok = /timeout-ok:/.test(raw) || /timeout-ok:/.test(prev);
    if (Number(value) > max && !ok) {
      problems.push({ job: j.name, line: j.from + idx + 1, problem: `timeout-minutes ${value} is over ${max} (add "# timeout-ok: why" or lower it)` });
    }
  }
  return problems;
}

function main(argv) {
  let dir = '.github/workflows';
  let max = DEFAULT_MAX;
  for (const a of argv) {
    if (a.startsWith('--max=')) max = Number(a.slice(6));
    else dir = a;
  }
  let files;
  try {
    files = readdirSync(dir).filter((f) => /\.ya?ml$/.test(f));
  } catch {
    console.log(`ci-timeouts: no ${dir}, nothing to check`);
    return 0;
  }
  let bad = 0;
  for (const f of files) {
    for (const p of checkWorkflow(readFileSync(join(dir, f), 'utf8'), max)) {
      console.error(`${join(dir, f)}:${p.line}: job "${p.job}": ${p.problem}`);
      bad++;
    }
  }
  if (bad) {
    console.error(`ci-timeouts: ${bad} problem(s). Every job needs timeout-minutes (about 2x its normal runtime, ${max} or less). Rule: ci-budget.md`);
    return 1;
  }
  console.log(`ci-timeouts: ${files.length} workflow file(s), every job has a timeout`);
  return 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) process.exit(main(process.argv.slice(2)));
