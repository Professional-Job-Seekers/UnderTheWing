const assert = require('node:assert/strict');
const { test, before, after, afterEach, mock } = require('node:test');
const { once } = require('node:events');
const express = require('express');
const session = require('express-session');
const passport = require('../middlewares/authentication');
const accounts = require('../controllers/accounts/queries');
const db = require('../models');
let server, base;

before(async () => {
  const app = express();
  app.use(express.json());
  app.use(session({ secret: 'test-session-secret', resave: false, saveUninitialized: false }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/auth', require('../controllers/auth'));
  app.get('/me', (req, res) => res.status(req.user ? 200 : 401).json(req.user || {}));
  // Test-only identities; production uses Passport sessions above.
  app.use('/progress', (req, res, next) => {
    if (req.headers['x-test-user']) req.user = { id: Number(req.headers['x-test-user']) };
    next();
  }, require('../controllers/pathways/progress/controller'));
  app.use((err, req, res, next) => res.status(500).json({ msg: 'Request failed' }));
  server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  base = `http://127.0.0.1:${server.address().port}`;
});
afterEach(() => mock.restoreAll());
after(async () => { await new Promise(resolve => server.close(resolve)); await db.sequelize.close(); });

const signup = () => fetch(`${base}/auth/signup`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'new-user', password: 'test-password' }),
});

test('signup establishes a session for the saved account', async () => {
  mock.method(accounts, 'createUser', async () => ({ id: 42, username: 'new-user' }));
  mock.method(accounts, 'findUserByPK', async id => id === 42 ? { id: 42, username: 'new-user' } : null);
  const response = await signup();
  assert.equal(response.status, 201);
  const cookie = response.headers.get('set-cookie')?.split(';')[0];
  const me = await fetch(`${base}/me`, { headers: { Cookie: cookie || '' } });
  assert.equal(me.status, 200);
  assert.equal((await me.json()).id, 42);
});

test('signup reports session creation failure rather than success', async () => {
  mock.method(accounts, 'createUser', async () => ({ id: 42, username: 'new-user' }));
  mock.method(passport._sm, 'logIn', (req, user, options, done) => done(new Error('Session failed')));
  assert.equal((await signup()).status, 500);
});

function update(user, taskId = 8) {
  return fetch(`${base}/progress/update`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', ...(user ? { 'x-test-user': String(user) } : {}) },
    body: JSON.stringify({ task_id: taskId, submission: 'Finished', username: 'someone-else' }),
  });
}

test('anonymous task updates are rejected before touching the database', async () => {
  const updateDb = mock.method(db.ActivePathwayTask, 'update', async () => { throw new Error('Must not write'); });
  assert.equal((await update()).status, 401);
  assert.equal(updateDb.mock.callCount(), 0);
});

test('task writes are restricted to their owner and awaited', async () => {
  const record = { id: 8, account_id: 42, status: 'pending', submission: '' };
  mock.method(db.ActivePathwayTask, 'update', async (values, { where }) => {
    if (where.id !== record.id || where.account_id !== record.account_id) return [0];
    await new Promise(resolve => setTimeout(resolve, 10));
    Object.assign(record, values);
    return [1];
  });
  const denied = await update(7);
  assert.equal(denied.status, 404);
  assert.equal(record.status, 'pending');
  const allowed = await update(42);
  assert.equal(allowed.status, 200);
  assert.equal(record.status, 'completed');
  assert.equal(record.submission, 'Finished');
});

test('task write errors return an error instead of a successful response', async () => {
  mock.method(db.ActivePathwayTask, 'update', async () => { throw new Error('Database unavailable'); });
  assert.equal((await update(42)).status, 500);
});

test('malformed task IDs are rejected', async () => {
  assert.equal((await update(42, 'invalid')).status, 400);
});
