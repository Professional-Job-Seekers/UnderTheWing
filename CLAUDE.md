# Under the Wing

- Pull requests: never write the description by hand. Run `node scripts/pr-body.mjs --what "<what and why>" > body.md`, then `gh pr create --body-file body.md`.
- Every GitHub Actions job sets `timeout-minutes` (enforcer: `node scripts/ci-timeouts.mjs`, CI check `ci-timeouts.yml`).
- No package is added without the owner's approval in chat (enforcer: `scripts/dep-vet.mjs`, `dependency-scan.yml`).
