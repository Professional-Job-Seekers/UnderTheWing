import assert from 'node:assert/strict';
import { createServer as createHttpServer } from 'node:http';
import { once } from 'node:events';
import { test } from 'node:test';
import { createServer, preview } from 'vite';

test('Vite serves deep links and forwards API paths, bodies and session cookies', async () => {
  const backend = createHttpServer(async (req, res) => {
    let body = '';
    for await (const chunk of req) body += chunk;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Set-Cookie', 'connect.sid=renewed; Path=/; HttpOnly');
    res.end(JSON.stringify({ path: req.url, method: req.method, cookie: req.headers.cookie, body }));
  });
  backend.listen(0, '127.0.0.1');
  await once(backend, 'listening');
  const previousProxy = process.env.PROXY;
  process.env.PROXY = `http://127.0.0.1:${backend.address().port}`;
  let dev;
  let production;
  try {
    dev = await createServer({ server: { host: '127.0.0.1', port: 0 } });
    await dev.listen();
    const devUrl = `http://127.0.0.1:${dev.httpServer.address().port}`;
    const page = await fetch(`${devUrl}/login`);
    assert.equal(page.status, 200);
    assert.match(await page.text(), /\/src\/index.jsx/);
    const module = await fetch(`${devUrl}/src/index.jsx`);
    assert.equal(module.status, 200);
    assert.match(await module.text(), /createRoot/);

    const response = await fetch(`${devUrl}/api/auth/login?source=smoke`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: 'connect.sid=original' },
      body: JSON.stringify({ username: 'test' }),
    });
    assert.equal(response.status, 200);
    assert.match(response.headers.get('set-cookie'), /connect.sid=renewed/);
    assert.deepEqual(await response.json(), {
      path: '/api/auth/login?source=smoke', method: 'POST', cookie: 'connect.sid=original',
      body: '{"username":"test"}',
    });

    production = await preview({ preview: { host: '127.0.0.1', port: 0 } });
    const productionUrl = `http://127.0.0.1:${production.httpServer.address().port}`;
    const builtPage = await fetch(`${productionUrl}/pathway/pathway-detail/engineering`);
    assert.equal(builtPage.status, 200);
    const html = await builtPage.text();
    const script = html.match(/src="([^\"]+\.js)"/);
    assert.ok(script, 'Production deep link must serve the built app');
    const asset = await fetch(new URL(script[1], productionUrl));
    assert.equal(asset.status, 200);
    assert.match(asset.headers.get('content-type'), /javascript/);
    assert.ok((await asset.text()).length > 1000);
  } finally {
    if (previousProxy === undefined) delete process.env.PROXY;
    else process.env.PROXY = previousProxy;
    await dev?.close();
    if (production) await new Promise(resolve => production.httpServer.close(resolve));
    await new Promise(resolve => backend.close(resolve));
  }
});
