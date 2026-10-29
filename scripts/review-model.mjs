#!/usr/bin/env node
// Picks the model and turn budget for the automatic PR review from what the PR changes (pr-review-bot.md).
// Usage: node scripts/review-model.mjs [--base origin/main] [--labels "a,b"] [--github-output]
// Tiers: deep (Opus) for risky paths or a big diff, light (Sonnet, few turns) for docs/tests/images only, standard (Sonnet) otherwise.
// Review is never given to Haiku: a missed bug costs more than the saving (git-actions.md).
// A PR label `review:deep` or `review:standard` overrides the pick. Per-project settings live under "review" in .github/pr-kit.json:
//   { "review": { "highRisk": ["regex", ...], "light": ["regex", ...], "deepLines": 600, "deepFiles": 25, "models": {...}, "turns": {...} } }
import { execFileSync } from 'node:child_process';
import { appendFileSync, existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const DEFAULTS = {
  models: { light: 'claude-sonnet-5-5', standard: 'claude-sonnet-5-5', deep: 'claude-opus-5-5' },
  turns: { light: 15, standard: 30, deep: 40 },
  deepLines: 600, // the feature-delivery.md split threshold
  deepFiles: 25,
  highRisk: [
    '(^|/)(migrations?|db/migrate)(/|$)',
    '\\.sql$',
    '(^|/)(auth|oauth|session|sessions|login|jwt|crypto|secrets?)([/._-]|$)',
    '(billing|payments?|stripe|checkout|webhooks?)',
    '^\\.github/workflows/',
    '(^|/)(Dockerfile|docker-compose[^/]*)$',
    '(^|/)(package\\.json|package-lock\\.json|pnpm-lock\\.yaml|yarn\\.lock|pyproject\\.toml|uv\\.lock|requirements[^/]*\\.txt)$',
    '(^|/)\\.env',
  ],
  light: [
    '\\.(md|mdx|txt|png|jpe?g|gif|svg|webp|ico)$',
    '\\.(test|spec)\\.[cm]?[jt]sx?$',
    '(^|/)(__tests__|tests?|e2e)/',
  ],
};

// Lock files can add thousands of lines without being reviewable code, so they do not count toward size.
const LOCKFILE = /(^|\/)(package-lock\.json|pnpm-lock\.yaml|yarn\.lock|uv\.lock|poetry\.lock|Cargo\.lock)$/;

const anyMatch = (patterns, path) => patterns.some((p) => new RegExp(p, 'i').test(path));

// files: [{ path, added, deleted }]; returns { tier, model, turns, reasons }.
export function pickReview(files, { labels = [], config = {} } = {}) {
  const c = {
    ...DEFAULTS,
    ...config,
    models: { ...DEFAULTS.models, ...config.models },
    turns: { ...DEFAULTS.turns, ...config.turns },
    highRisk: [...DEFAULTS.highRisk, ...(config.highRisk || [])],
    light: [...DEFAULTS.light, ...(config.light || [])],
  };
  const done = (tier, reasons) => ({ tier, model: c.models[tier], turns: c.turns[tier], reasons });
  const names = labels.map((l) => l.trim().toLowerCase());
  if (names.includes('review:deep')) return done('deep', ['label review:deep']);
  if (names.includes('review:standard')) return done('standard', ['label review:standard']);

  const counted = files.filter((f) => !LOCKFILE.test(f.path));
  const lines = counted.reduce((n, f) => n + f.added + f.deleted, 0);
  const risky = files.filter((f) => anyMatch(c.highRisk, f.path)).map((f) => f.path);
  const reasons = [];
  if (risky.length) reasons.push(`risky paths: ${risky.slice(0, 5).join(', ')}${risky.length > 5 ? ` (+${risky.length - 5})` : ''}`);
  if (lines > c.deepLines) reasons.push(`${lines} changed lines (over ${c.deepLines})`);
  if (counted.length > c.deepFiles) reasons.push(`${counted.length} files (over ${c.deepFiles})`);
  if (reasons.length) return done('deep', reasons);

  if (files.length && files.every((f) => anyMatch(c.light, f.path))) return done('light', ['docs, tests and images only']);
  return done('standard', [`${files.length} files, ${lines} changed lines, no risky paths`]);
}

// Parses `git diff --numstat` output. Binary files show `-` and count as 0 lines. Renames show `old => new` or `{a => b}`.
export function parseNumstat(text) {
  return text
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => {
      const [a, d, ...rest] = line.split('\t');
      const raw = rest.join('\t');
      const path = raw.replace(/\{[^}]*? => ([^}]*)\}/, '$1').replace(/^.* => /, '').replace(/\/\//g, '/');
      return { path, added: Number(a) || 0, deleted: Number(d) || 0 };
    });
}

function main() {
  const args = process.argv.slice(2);
  const opt = (name, fallback) => {
    const i = args.indexOf(name);
    return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
  };
  const base = opt('--base', 'origin/main');
  const labels = opt('--labels', '').split(',').filter(Boolean);
  const cfgPath = '.github/pr-kit.json';
  const config = existsSync(cfgPath) ? JSON.parse(readFileSync(cfgPath, 'utf8')).review || {} : {};
  const out = execFileSync('git', ['diff', '--numstat', `${base}...HEAD`], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  const result = pickReview(parseNumstat(out), { labels, config });
  console.log(JSON.stringify(result, null, 2));
  if (args.includes('--github-output') && process.env.GITHUB_OUTPUT) {
    const reason = result.reasons.join('; ').replace(/[\r\n]+/g, ' ');
    appendFileSync(process.env.GITHUB_OUTPUT, `model=${result.model}\ntier=${result.tier}\nturns=${result.turns}\nreason=${reason}\n`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
