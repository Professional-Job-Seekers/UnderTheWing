# Fall 2020 CTP Project: Under The Wing <!-- omit in toc -->

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

Under the Wing is a virtual mentoring platform that pairs college students & working professionals with highschool seniors who have similar career interests in a Mentor-Mentee relationship. The platform will support and facilitate the mentoring relationship by providing pathways for both mentors and mentees to follow. Moreover, unlike other professional networking platforms, Under the Wing guarantees that mentees get matched with a mentor and vice versa. In short, Under the Wing will provide an opportunity for Mentees to develop their professional network and skills while also providing mentors with a pipeline to talent and an opportunity to give back.

![Alt text](docs/design/wireframes/views/Mentee-Mentor-Pathway-Commit-Flow.gif?raw=true "Account View")

![Alt text](docs/design/wireframes/views/Pathway-Creation-Flow.gif?raw=true "Account View")


![Alt text](docs/design/wireframes/views/Signup-Flow.gif?raw=true "Account View")

## Stack

### API

- express.js
- sequelize.js

### React client

- Built using `create-react-app` and configured to work with the api.
- Bootstrap 4.x added to `/client/public/index.html`
- React Router

## Getting Started

### Project Structure

<pre>
.
│   .dockerignore
│   .env.example
│   .gitignore
│   docker-compose.yaml
│   package-lock.json
│   package.json
│   README.md
│
├───api
│   │   .dockerignore
│   │   app.js
│   │   Dockerfile
│   │
│   ├───config
│   │       config.json
│   │
│   ├───controllers
│   │   │   appConfig.js
│   │   │   auth.js
│   │   │   index.js
│   │   │
│   │   ├───accounts
│   │   │       accounts.js
│   │   │       queries.js
│   │   │
│   │   ├───mentees
│   │   │       mentees.js
│   │   │       queries.js
│   │   │
│   │   ├───mentors
│   │   │       mentors.js
│   │   │       queries.js
│   │   │
│   │   └───pathways
│   │       │   pathways.js
│   │       │   queries.js
│   │       │
│   │       ├───commit
│   │       │       controller.js
│   │       │       queries.js
│   │       │
│   │       ├───creation
│   │       │       controller.js
│   │       │       queries.js
│   │       │
│   │       ├───progress
│   │       │       controller.js
│   │       │       queries.js
│   │       │
│   │       └───update
│   │               controller.js
│   │               queries.js
│   │
│   ├───middlewares
│   │       authentication.js
│   │
│   ├───migrations
│   └───models
│           account.js
│           activePathway.js
│           activePathwayTask.js
│           index.js
│           login.js
│           mentee.js
│           mentor.js
│           pathway.js
│           pathwayCategory.js
│           pathwayTask.js
│           taskCategory.js
│
├───client
│   │   .dockerignore
│   │   .gitignore
│   │   Dockerfile
│   │   package-lock.json
│   │   package.json
│   │   README.md
│   │
│   ├───public
│   │       favicon.ico
│   │       index.html
│   │       logo192.png
│   │       logo512.png
│   │       manifest.json
│   │       robots.txt
│   │
│   └───src
│       │   App.css
│       │   App.js
│       │   App.test.js
│       │   index.css
│       │   index.js
│       │   logo.svg
│       │   serviceWorker.js
│       │   setupProxy.js
│       │
│       ├───components
│       │       Loading.js
│       │       Post.js
│       │
│       ├───pages
│       │       AboutUsPage.js
│       │       PostFormPage.js
│       │       PostsListPage.js
│       │       ShowPostPage.js
│       │
│       └───views
│           └───Accounts
│                   LoginPage.js
│                   RegisterPage.js
│
└───docs
    │   api.md
    │   design.md
    │
    ├───api
    │       accounts.md
    │       auth.md
    │       mentee.md
    │       mentors.md
    │       pathways.md
    │
    └───design
        ├───draw.io-src-files
        │   ├───models
        │   │       schema.drawio
        │   │
        │   └───views
        │           account-view.drawio
        │           login-view.drawio
        │           scheduling-view.drawio
        │
        ├───models
        │       schema.png
        │
        └───wireframes
            └───views
                    account-view.png
                    login-view.png
                    pathways-view.png
                    scheduling-view.png
</pre>

## Dev Setup

Each team member will need to do this on their local machine.

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
npm install
npm run dev
```

```bash
# react-client terminal 2
cd client
npm install
npm start
```

- api-backend will launch at: [http://localhost:8080](http://localhost:8080)
- react-client will launch at: [http://localhost:3000](http://localhost:3000)

> In production you will only deploy a single app. The react client will build into static files that will be served from the backend.

## Dev Setup and Running the app with Docker

```bash
# From project root.
docker-compose build && docker-compose up
```

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
