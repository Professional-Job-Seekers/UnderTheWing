const { createProxyMiddleware } = require('http-proxy-middleware');

let target_server = process.env.PROXY ||  "http://localhost:8080/";
console.log(target_server);
module.exports = app => {
  app.use("/api/*", createProxyMiddleware({ target: target_server, changeOrigin: true}));
}