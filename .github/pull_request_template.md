## What and why


## Audience (user-facing changes)

<!-- Tick exactly one. `node scripts/pr-body.mjs --what "..."` writes this whole description with the right box ticked. Extra audiences (admin only, paid, ...) are rules in .github/pr-kit.json, each needing one box here with the same label. -->

- [ ] n/a: no user-facing change
- [ ] **Everyone**: released on purpose

## Changelog

<!-- One or two sentences for the project's changelog (the "PR changelog" check needs real text here; write "n/a: <why>" for a change that needs none). `node scripts/pr-body.mjs --changelog "..."` fills it. -->

## Delivery

<!-- One feature, one brief, one PR (feature-delivery.md). `node scripts/pr-body.mjs --brief "<path>" --split "<reason>"` fills these. A split needs one of: migration first, file overlap with an open PR (name it), over about 600 lines or 25 files, pure-move refactor first, device or owner-only part. -->

Brief: none given (pass --brief)
Split because: n/a: this PR is the whole feature

## Done

<!-- Paste the card's "Done when" list (definition-of-done.md). Mark each line with its evidence label: verified, read-only, agent-reported or not run (say why). A line that is not verified means this is ready for review with a gap, not done. -->

- [ ] Every "Done when" line is listed above with its evidence label
- [ ] The project's Definition of done (its CLAUDE.md) walked through; gaps named here

## Checks

- [ ] The project's test, lint and build commands pass (replace this line with them)
- [ ] Docs and changelog updated
- [ ] CI minutes: n/a (no workflow or test-suite change), or before and after for PR wall-clock and runner minutes, with any new job, leg or timeout named (`ci-budget.md`)
- [ ] New packages: none, or listed in the description with the lower ladder rung and a `Dependency approval:` line (`dependency-security.md`)
