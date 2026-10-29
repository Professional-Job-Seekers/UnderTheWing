const express = require('express');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const morgan = require('morgan');
const path = require('path');
const db = require('./models');
const passport = require('./middlewares/authentication');
const app = express();
const PORT = process.env.PORT || 8000;

const isProduction = process.env.NODE_ENV === 'production';
if (isProduction && !process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET must be set in production');
}

// Render terminates TLS in front of us; trust it so secure cookies work
if (isProduction) app.set('trust proxy', 1);

// this lets us parse 'application/json' content in http requests
app.use(bodyParser.json())

// add http request logging to help us debug and audit app use
const logFormat = process.env.NODE_ENV==='production' ? 'combined' : 'dev';
app.use(morgan(logFormat));

// setup passport and session cookies
app.use(expressSession({ 
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax', secure: isProduction ? 'auto' : false } }));
app.use(passport.initialize());
app.use(passport.session());

// this mounts controllers/index.js at the route `/api`
app.use('/api', require('./controllers'));

// for production use, we serve the static react build folder
if(process.env.NODE_ENV==='production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  // all unknown routes should be handed to our react app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// uptime check for the host and keep-alive pings
app.get('/healthz', (req, res) => res.json({ ok: true }));

// update DB tables based on model updates. Does not handle renaming tables/columns
// NOTE: toggling this to true drops all tables (including data)

const syncMode = process.env.NODE_ENV==='docker' ? true : false;

if (syncMode) {
  db.sequelize.sync({ force:false }).then(async res => {
  
  }).catch(err => {
    console.log(err);
  })
} else {
  db.sequelize.sync({ force: false }).then(async () => {
    if (process.env.SEED_DEMO_DATA === 'true') await require('./seed/demo').seedDemoData();
  }).catch(err => console.log(err));
}

// start up the server
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

