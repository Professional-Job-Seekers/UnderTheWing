![Alt text](docs/design/wireframes/views/under-the-wing.png?raw=true "Account View")

## Table Of Contents <!-- omit in toc -->

- [Overview](#overview)
  - [Description](#description)
- [Stack](#stack)
  - [API](#api)
  - [React client](#react-client)
- [Getting Started](#getting-started)
  - [Project Structure](#project-structure)
- [Dev Setup](#dev-setup)
  - [Create a postgres db](#create-a-postgres-db)
  - [Running the app](#running-the-app)
- [Dev Setup and Running the app with Docker](#dev-setup-and-running-the-app-with-docker)
- [Deployment](#deployment)
  - [Setting up Heroku](#setting-up-heroku)
  - [Create a Heroku project](#create-a-heroku-project)
  - [Deploying the app](#deploying-the-app)
- [Team](#team)
- [Acknowledgements](#acknowledgements)

## Overview

### Description

Under the Wing - Virtual Mentorship. 
A web platform that helps college students find working professional mentors.

- A virtual mentoring platform that pairs college students & working professionals with highschool seniors who have similar career interests in a Mentor-Mentee relationship. The platform will support and facilitate the mentoring relationship by providing pathways for both mentors and mentees to follow. Moreover, unlike other professional networking platforms, Under the Wing guarantees that mentees get matched with a mentor and vice versa. In short, Under the Wing will provide an opportunity for Mentees to develop their professional network and skills while also providing mentors with a pipeline to talent and an opportunity to give back.


![Alt text](docs/design/wireframes/views/Mentee-Mentor-Pathway-Commit-Flow.gif?raw=true "Account View")

![Alt text](docs/design/wireframes/views/Pathway-Creation-Flow.gif?raw=true "Account View")


![Alt text](docs/design/wireframes/views/Signup-Flow.gif?raw=true "Account View")

## Stack

### API

- express.js
- sequelize.js

### React client

- React 19 with Vite 8; development API requests are proxied to Express.
- Bootstrap 5 and React-Bootstrap 2.
- React Router 5 (existing route API retained).

## Getting Started

### Project Structure

```text
api/                     Express API, Sequelize models and controllers
api/tests/               Backend compatibility tests and data-generation scripts
client/index.html        Vite HTML entry point
client/vite.config.mjs   React plugin, API proxy and production output configuration
client/src/index.jsx     React 19 createRoot entry point
client/src/App.jsx       Application routes
client/src/              Pages, components, assets and styles
client/public/           Static files copied into the production build
client/tests/            Vite integration check (legacy examples are not test suites)
client/build/            Generated production assets served by Express (ignored)
docs/                    API and design documentation
```

## Dev Setup

Each team member will need to do this on their local machine.

Use Node.js 24.15 or newer within the Node 24 LTS line (see `.nvmrc`) and
npm 10 or newer. With nvm installed, run `nvm install && nvm use`.
Both apps use committed npm lockfiles; use `npm ci` for repeatable installs.
Docker uses Node 24 as well.

From the project root:

```bash
npm ci
npm ci --prefix client
npm test                         # Backend model, logout and UUID compatibility
npm test --prefix client         # React mount, navigation and Bootstrap tabs
npm run test:integration --prefix client # Build, deep links and API/cookie proxy
npm run build                    # Clean client install and Vite production build
npm audit
npm audit --prefix client
```

Vite writes production assets into `client/build`, the directory Express already
serves. Its development server stays on port 3000 and proxies `/api` to
`http://localhost:8080`. Set `PROXY` in `client/.env.local` (or the shell) to use
another backend address. Docker supplies `PROXY=http://server:8000` and enables
file-watch polling. Vite preview is for locally checking built assets, not
production hosting. The full API still requires Postgres as described below.

Create React App, its unused service-worker template, and the old forced
resolution scripts have been removed. Both full dependency audits reported zero
vulnerabilities after the migration. Sequelize 6 currently needs a scoped npm
`overrides` entry for `uuid` 11.1.1 or newer in the 11.x line: this fixes the
buffer-bounds advisory while preserving CommonJS support. The backend tests
exercise Sequelize's UUID defaults and transaction IDs against this override.
Do not replace it with an ESM-only UUID major without retesting Sequelize.

### Create a postgres db

Create a user in postgres named `ctp_user` with the password `ctp_pass`:

> This only needs to be done one time on your machine
> You can create additional users if you want to.

```postgres
createuser -P -s -e ctp_user
```

Create a separate db for this project:

```postgres
createdb -h localhost -U ctp_user app2019_development
```

> You will create a DB for each project you start based on this repo. For other projects change `app2019_development` to the new apps database name.

*For more details see this [installing postgres guide](https://github.com/CUNYTechPrep/ctp2019/blob/master/guides/installing-postgresql.md)*

### Running the app

For local development you will need two terminals open, one for the api-backend and another for the react-client.

*Clone* this app, then:

```bash
# api-backend terminal 1
cp .env.example .env
npm ci
npm run dev
```

```bash
# react-client terminal 2
cd client
npm ci
npm start
```

- api-backend will launch at: [http://localhost:8080](http://localhost:8080)
- react-client will launch at: [http://localhost:3000](http://localhost:3000)

> In production you will only deploy a single app. The react client will build into static files that will be served from the backend.

## Dev Setup and Running the app with Docker

```bash
# From project root.
docker compose up --build
```

Open [http://localhost:4960](http://localhost:4960). The API is available on
port 8000 and Postgres on port 5432. Docker supplies the database configuration;
no separate local Postgres installation is required.

The API directory is bind-mounted and nodemon polls for changes. The client
`src/`, `public/`, `index.html`, and `vite.config.mjs` are bind-mounted, with Vite
polling enabled for Docker Desktop. Code edits reload without rebuilding.
Dependencies stay inside each image so host `node_modules` cannot overwrite
Linux container packages. After changing either package manifest or lockfile,
run `docker compose up --build` again.

Postgres has a persistent `postgres_data` volume, and the API waits for its
health check before starting. `docker compose down` stops the stack and preserves
the database. Avoid adding `--volumes` unless you intend to delete database data.
The development session secret can be set with `SESSION_SECRET` in the root
`.env` file. View service output with `docker compose logs -f server client`.

## Deployment

### Setting up Heroku

Install the heroku cli if you don't already have it.

> You will also need a heroku account
> And this will only be done once on your machine

```bash
# on mac
brew install heroku/brew/heroku
heroku login
```

### Create a Heroku project

Next, `cd` into this project directory and create a project:

```bash
heroku create cool-appname
heroku addons:create heroku-postgresql:hobby-dev
```

> This will deploy your apps to [https://cool-appname.herokuapp.com](https://cool-appname.herokuapp.com), assuming that it is not taken already.
> You only need to do this once per app

### Deploying the app

Whenever you want to update the app run this command.

```bash
git push heroku master
```

> This command deploys your master branch. You can change that and deploy a different branch such as: `git push heroku development`

## Team

1. Joshua Carpentier ([jacgit18](https://github.com/jacgit18))
1. Muneeb Khawaja ([mtkhawaja](http://github.com/mtkhawaja))

## Acknowledgements
