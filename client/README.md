# Under the Wing client

React 19, Vite 8, React-Bootstrap 2 and Bootstrap 5. Use Node 24.15+ (24.x)
and npm 10+. React Router 5 is retained to preserve the existing routes.

```bash
npm ci
npm start                 # Vite at http://localhost:3000
npm test                  # Vitest component and entry-point tests
npm run test:watch        # Interactive test watcher
npm run test:integration  # Build and check HTTP deep links and API/session proxy
npm run build             # Output: build/ (served by the Express backend)
npm run preview           # Locally preview the production build
npm audit                 # Includes development dependencies
```

Vite proxies `/api` to `http://localhost:8080`. To change the backend, set
`PROXY=http://localhost:8000` in `.env.local` or the shell. Docker supplies its own
proxy target and `CHOKIDAR_USEPOLLING=true` for mounted source files.

The HTML entry is `index.html`; source JSX files use the `.jsx` extension.
Public files use root-relative URLs (for example `/favicon.ico`). Client-side
configuration uses `import.meta.env.VITE_*`; never put secrets into VITE variables,
since those values are included in the browser bundle.

The old Create React App scripts, proxy middleware, public HTML template and
unused service-worker template are gone. Production builds still go to `build/`
to match the existing Express deployment. `vite preview` is only a local preview.

Tests in `src/` run in jsdom. `tests/vite.test.mjs` starts temporary local HTTP
servers to check proxy paths, POST bodies, session cookies and production assets.
The older `tests/learn-sequelize.test.js` is a standalone database experiment,
not part of the client test suite.
