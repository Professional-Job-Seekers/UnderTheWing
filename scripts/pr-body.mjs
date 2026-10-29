#!/usr/bin/env node
// Builds a pull request description from .github/pull_request_template.md, with the Audience box already ticked, so the "PR audience"
// check (.github/workflows/pr-audience.yml) passes without anyone remembering it. The template stays the one source of the wording.
//
//   node scripts/pr-body.mjs --what "One paragraph on what changed and why" > /tmp/body.md
//   (the Changelog section is filled from --what, or from --changelog "..." when it should say less)
//   --brief <path or "n/a: why">   fills the Delivery section's Brief line (feature-delivery.md: one brief, one branch, one PR)
//   --split "<reason>"             fills "Split because:" when the feature is not this PR alone (the reasons are in feature-delivery.md)
//   --tracker "<note>"             fills the "PR tracker:" line: the PR-TRACKER.md row you updated (feature; for a fix PR also the cause code)
//   --type <bug|enhancement|documentation|dependencies|chore>   the PR's label when the guess below is wrong
//   --apply <pr number>            after the PR exists, add its label: `node scripts/pr-body.mjs --apply 478` (creates the label if the repo lacks it)
//   gh pr create --title "..." --body-file /tmp/body.md --label <the label printed on stderr>
//
// The audience is worked out from the diff against origin/main (the reason goes to stderr), and --audience <key> overrides it:
//   na        every changed file is a doc, test, script, tool, CI or config file: nothing a user can see
//   <rules>   each rule in .github/pr-kit.json "audiences", in order (a changed file, or a line added to a file's diff)
//   everyone  anything else
// This script is the same in every project; what differs lives in .github/pr-kit.json (all keys optional, see DEFAULTS below) and in the
// template's Audience and Checks lines. Every audience's label must appear in exactly one Audience box of the template.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// A key set in .github/pr-kit.json replaces that key's default entirely (it does not add to it), so a project that sets `notUserFacing` or `ui` lists every pattern.
const DEFAULTS = {
  // Paths that can never change what a user sees (regex source strings).
  notUserFacing: ['^docs?/', '^tests?/', '^e2e[\\w-]*/', '^scripts/', '^tools/', '^\\.github/', '^\\.githooks/', '^\\.husky/', '^\\.claude/', '\\.(test|spec)\\.[jt]sx?$', '\\.md$', '^package(-lock)?\\.json$', '^tsconfig[\\w.]*\\.json$', '^Dockerfile$', '^docker-compose\\.ya?ml$'],
  // Extra audiences, checked in order after n/a: { key, label, files?: [paths], diffFile?, diffPattern? (regex source, multiline), reason }.
  audiences: [],
  // Paths that can move a Lighthouse score or look of the page (regex source strings).
  ui: ['\\.(css|tsx|jsx|vue|svelte|svg|png|webp|woff2?)$', '^index\\.html$', '^public/'],
  // A Checks line (regex source, case-insensitive) that is ticked for a change that touches no UI, because it reads n/a then. Empty: none.
  autoTickWhenNoUi: '',
  // Reason shown for the fallback audience.
  everyoneReason: 'user-visible files changed and no other audience rule matched',
};
const BUILT_IN_LABELS = { na: 'n/a:', everyone: '**Everyone**' };

/** The project's settings: DEFAULTS with whatever .github/pr-kit.json sets. */
export function loadConfig(path = fileURLToPath(new URL('../.github/pr-kit.json', import.meta.url))) {
  return { ...DEFAULTS, ...(existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : {}) };
}

const any = (patterns, f, flags = '') => patterns.some(p => new RegExp(p, flags).test(f));
export const labelsOf = config => ({ ...BUILT_IN_LABELS, ...Object.fromEntries(config.audiences.map(a => [a.key, a.label])) });

/** Which audience a change has, from its file names and its diffs (`diffs` maps a file name to its added/removed lines). Returns { audience, reason }. */
export function inferAudience(files, diffs = {}, config = loadConfig()) {
  if (files.length > 0 && files.every(f => any(config.notUserFacing, f))) return { audience: 'na', reason: 'only docs, tests, scripts, CI or config files changed' };
  for (const a of config.audiences) {
    const byFile = (a.files || []).some(f => files.includes(f));
    const byDiff = a.diffFile && a.diffPattern && new RegExp(a.diffPattern, 'm').test(diffs[a.diffFile] || '');
    if (byFile || byDiff) return { audience: a.key, reason: a.reason };
  }
  return { audience: 'everyone', reason: config.everyoneReason };
}

// The label a PR gets, by what the work is: bug (a fix), dependencies, documentation, chore (tests, scripts, CI, config), else enhancement.
export const LABELS = { bug: ['d73a4a', 'Something isn\'t working'], enhancement: ['a2eeef', 'New feature or request'], documentation: ['0075ca', 'Improvements or additions to documentation'], dependencies: ['0366d6', 'Pull requests that update a dependency file'], chore: ['ededed', 'Tests, scripts, CI or config: nothing a user sees'] };
/** What the work is. `branch`, `what` and `tracker` carry the author's own words; a fix says so there ("fix/..." branch, "Fix ..." text, "fix cause" in the tracker note). Returns { type, reason }. */
export function inferType({ branch = '', files = [], what = '', tracker = '' }, config = loadConfig()) {
  const letter = { b: 'bug', d: 'documentation', c: 'chore', p: 'dependencies' }[(branch.match(/^([bdcp])-/) || [])[1]]; // rules/branch-naming.md; f- falls through to the checks below
  if (letter) return { type: letter, reason: `the branch name starts with ${branch[0]}-` };
  if (/^(fix|bug|hotfix)[/-]|[/-](fix|bugfix)([/-]|$)/i.test(branch)) return { type: 'bug', reason: 'the branch name says fix' };
  if (/^\s*(fix|fixes|fixed|bug)\b/i.test(what)) return { type: 'bug', reason: 'the description starts with a fix' };
  if (/\bfix cause\b|\b(main-break|logic gap|regression)\b/i.test(tracker)) return { type: 'bug', reason: 'the tracker note names a fix cause' };
  if (/^dependabot\/|^deps?[/-]/i.test(branch) || (files.length > 0 && files.every(f => /(^|\/)package(-lock)?\.json$/.test(f)))) return { type: 'dependencies', reason: 'only dependency files changed' };
  if (files.length > 0 && files.every(f => /\.md$/.test(f) || /^docs?\//.test(f))) return { type: 'documentation', reason: 'only docs changed' };
  if (files.length > 0 && files.every(f => any(config.notUserFacing, f))) return { type: 'chore', reason: 'only tests, scripts, CI or config changed' };
  return { type: 'enhancement', reason: 'user-visible work that is not a fix' };
}

/** True when the change can move a Lighthouse score: UI code, styles, fonts, images, the page shell or the build config. */
export const touchesUi = (files, config = loadConfig()) => files.some(f => any(config.ui, f));

/** A changelog entry from a long description: whole sentences up to 600 characters, never cut mid-word. */
export function shorten(text, max = 600) {
  const t = text.trim().replace(/\s+/g, ' ');
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const end = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
  return end > 0 ? cut.slice(0, end + 1) : cut.slice(0, cut.lastIndexOf(' ')) + '…';
}

/** The template with exactly one Audience box ticked and the What section filled in. A change that touches no UI (`ui` false) also gets the config's `autoTickWhenNoUi` Checks line ticked (the Lighthouse line in iron-log, which reads n/a then); for a UI change it stays open for the author to tick after running the check, because that run is theirs to do. */
export function buildBody(template, audience, what = '', ui = false, changelog = '', config = loadConfig(), delivery = {}) {
  const labels = labelsOf(config);
  const auto = config.autoTickWhenNoUi ? new RegExp(config.autoTickWhenNoUi, 'i') : null;
  let inAudience = false;
  const out = template.split('\n').map(line => {
    if (/^## /.test(line)) inAudience = /^## Audience/.test(line);
    if (inAudience && /^- \[ \]/.test(line)) return line.includes(labels[audience]) ? line.replace('- [ ]', '- [x]') : line;
    if (!ui && auto && /^- \[ \]/.test(line) && auto.test(line)) return line.replace('- [ ]', '- [x]'); // not a UI change: n/a, as the line says
    return line;
  }).join('\n');
  const entry = changelog ? changelog.trim().replace(/\s+/g, ' ') : shorten(what);
  const withLog = entry ? out.replace(/^(## Changelog\n\n)((?:<!--[\s\S]*?-->\n)?)/m, (_, h, c) => `${h}${c}${entry}\n`) : out;
  const withWhat = what ? withLog.replace(/^## What and why\n\n/m, () => `## What and why\n\n${what.trim()}\n`) : withLog;
  const oneLine = t => t.trim().replace(/\s+/g, ' ');
  const withBrief = delivery.brief ? withWhat.replace(/^Brief:.*$/m, () => `Brief: ${oneLine(delivery.brief)}`) : withWhat;
  const withSplit = delivery.split ? withBrief.replace(/^Split because:.*$/m, () => `Split because: ${oneLine(delivery.split)}`) : withBrief;
  const body = delivery.tracker ? withSplit.replace(/^PR tracker:.*$/m, () => `PR tracker: ${oneLine(delivery.tracker)}`) : withSplit;
  const audienceSection = body.split('\n').reduce((acc, line) => { if (/^## /.test(line)) acc.on = /^## Audience/.test(line); if (acc.on) acc.lines.push(line); return acc; }, { on: false, lines: [] }).lines;
  if (audienceSection.filter(l => /^- \[x\]/i.test(l)).length !== 1) throw new Error('The template has no Audience box matching ' + audience);
  return body;
}

/** Open PRs of yours that change a file this PR also changes, with the shared files. A shared file is the one reason to wait for another PR or fold into it
 *  (parallel-agent-structure.md, "Serial or parallel"); two PRs with no file in common run side by side. */
export function overlappingPrs(files, prs) {
  const mine = new Set(files);
  return prs.map(p => ({ number: p.number, shared: (p.files ?? []).map(f => (typeof f === 'string' ? f : f.path)).filter(f => mine.has(f)) })).filter(p => p.shared.length);
}

/** Warnings for the Delivery section (feature-delivery.md). Advisory: they print to stderr and never stop the PR. */
export function deliveryWarnings({ brief, split, tracker, trackerLine = false, overlaps = [] }) {
  const w = [];
  if (!brief) w.push('Delivery: no --brief given. Pass the feature brief path, or --brief "n/a: <why>" for a change that needs none.');
  if (!split && overlaps.length) w.push(`Delivery: this PR changes ${overlaps.map(o => `${o.shared.slice(0, 3).join(', ')}${o.shared.length > 3 ? ` and ${o.shared.length - 3} more` : ''} (also in #${o.number})`).join('; ')}. Wait for that PR to merge and branch off main, fold this into it, or say why with --split "file overlap: <file>". PRs with no file in common need no warning.`);
  if (trackerLine && !tracker) w.push('Delivery: no --tracker given. Update this feature\'s row in PR-TRACKER.md (project docs) and say which with --tracker "<feature; fix cause>", or --tracker "n/a: <why>" (tooling, docs, Dependabot).');
  return w;
}

const otherOpenPrs = git => { try { const branch = git('branch', '--show-current').trim(); return JSON.parse(execFileSync('gh', ['pr', 'list', '--author', '@me', '--state', 'open', '--json', 'number,headRefName,files'], { encoding: 'utf8', timeout: 8000 })).filter(p => p.headRefName !== branch); } catch { return []; } };

function main(argv) {
  const arg = name => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : undefined; };
  const git = (...a) => execFileSync('git', a, { encoding: 'utf8' });
  const config = loadConfig();
  const typeGiven = arg('--type');
  if (typeGiven && !LABELS[typeGiven]) { console.error(`--type must be one of: ${Object.keys(LABELS).join(', ')}`); process.exit(2); }
  const applyTo = arg('--apply');
  if (applyTo !== undefined) { // label an existing PR from its own branch, files and body
    const pr = JSON.parse(execFileSync('gh', ['pr', 'view', applyTo, '--json', 'headRefName,files,body,title'], { encoding: 'utf8' }));
    const { type, reason } = typeGiven ? { type: typeGiven, reason: 'given with --type' } : inferType({ branch: pr.headRefName, files: pr.files.map(f => f.path), what: pr.title, tracker: (pr.body.match(/^PR tracker:.*$/m) || [''])[0] }, config);
    const have = execFileSync('gh', ['label', 'list', '--limit', '200', '--json', 'name'], { encoding: 'utf8' });
    if (!JSON.parse(have).some(l => l.name === type)) execFileSync('gh', ['label', 'create', type, '--color', LABELS[type][0], '--description', LABELS[type][1]], { stdio: 'inherit' });
    execFileSync('gh', ['pr', 'edit', applyTo, '--add-label', type], { stdio: 'inherit' });
    console.error(`Label: ${type} (${reason}) added to PR ${applyTo}.`);
    return;
  }
  const labels = labelsOf(config);
  const base = ['origin/main', 'main'].find(b => { try { git('rev-parse', '--verify', b); return true; } catch { return false; } }) || 'HEAD';
  const files = git('diff', '--name-only', `${base}...HEAD`).split('\n').filter(Boolean);
  const diffs = Object.fromEntries([...new Set(config.audiences.map(a => a.diffFile).filter(Boolean))].map(f => [f, git('diff', '-U0', `${base}...HEAD`, '--', f)]));
  const given = arg('--audience');
  if (given && !labels[given]) { console.error(`--audience must be one of: ${Object.keys(labels).join(', ')}`); process.exit(2); }
  const found = given ? { audience: given, reason: 'given with --audience' } : inferAudience(files, diffs, config);
  console.error(`Audience: ${found.audience} (${found.reason}). ${files.length} file(s) against ${base}.`);
  const kind = typeGiven ? { type: typeGiven, reason: 'given with --type' } : inferType({ branch: git('branch', '--show-current').trim(), files, what: arg('--what') || '', tracker: arg('--tracker') || '' }, config);
  console.error(`Label: ${kind.type} (${kind.reason}). After the PR is open: node scripts/pr-body.mjs --apply <number> (or gh pr create --label ${kind.type}).`);
  const template = readFileSync(fileURLToPath(new URL('../.github/pull_request_template.md', import.meta.url)), 'utf8');
  if (!arg('--changelog') && arg('--what')) console.error('No --changelog given: the Changelog section is the --what text (cut at a sentence end past 600 characters). Pass --changelog "..." to say it shorter.');
  for (const w of deliveryWarnings({ brief: arg('--brief'), split: arg('--split'), tracker: arg('--tracker'), trackerLine: /^PR tracker:/m.test(template), overlaps: overlappingPrs(files, otherOpenPrs(git)) })) console.error(w);
  process.stdout.write(buildBody(template, found.audience, arg('--what'), touchesUi(files, config), arg('--changelog'), config, { brief: arg('--brief'), split: arg('--split'), tracker: arg('--tracker') }));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main(process.argv.slice(2));
