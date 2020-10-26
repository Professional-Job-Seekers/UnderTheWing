const proxy = require("http-proxy-middleware");

target_server = process.env.PROXY ||  "http://localhost:8080/";

module.exports = app => {
  app.use(proxy("/api/*", { target: target_server }));
}