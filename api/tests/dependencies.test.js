const assert = require('node:assert/strict');
const { test } = require('node:test');

test('Sequelize generates UUID defaults and transaction IDs with patched uuid', async () => {
  const { Sequelize, DataTypes, Transaction } = require('sequelize');
  const sequelize = new Sequelize('postgres://test:test@localhost/test', { logging: false });
  const Record = sequelize.define('UuidCompatibility', {
    first: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV1 },
    second: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
  });
  try {
    const record = Record.build();
    assert.match(record.first, /^[\da-f]{8}-[\da-f]{4}-1[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i);
    assert.match(record.second, /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i);
    const transaction = new Transaction(sequelize, {});
    assert.match(transaction.id, /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i);
    assert.notEqual(Record.build().second, record.second);
  } finally {
    await sequelize.close();
  }
});

test('models load with their associations without connecting to Postgres', async () => {
  const db = require('../models');
  assert.equal(db.Account.build({ username: 'test' }).username, 'test');
  assert.ok(Object.keys(db.Account.associations).length > 0);
  await db.sequelize.close();
});

test('logout waits for session cleanup before responding', async () => {
  const router = require('../controllers/auth');
  const handler = router.stack.find(layer => layer.route?.path === '/logout').route.stack[0].handle;
  let complete;
  let response;
  await handler({ logout(callback) { complete = callback; } }, {
    status(code) { assert.equal(code, 200); return this; },
    json(body) { response = body; }
  }, error => { throw error; });
  assert.equal(response, undefined);
  assert.equal(typeof complete, 'function');
  complete();
  assert.equal(response.msg, 'Logout successful');
});

test('logout forwards session cleanup errors', async () => {
  const router = require('../controllers/auth');
  const handler = router.stack.find(layer => layer.route?.path === '/logout').route.stack[0].handle;
  const error = new Error('Session storage unavailable');
  let forwarded;
  await handler({ logout(callback) { callback(error); } }, {
    status() { assert.fail('Logout must not report success'); }
  }, value => { forwarded = value; });
  assert.equal(forwarded, error);
});
