'use strict';

const Koa = require('koa');
const path = require('path');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');

const logger = require('../utils/logger')(__filename);
const router = require('../routes');
const koaStatic = require('koa-static');

module.exports = (config) => {
  const app = new Koa();

  app.keys = config.cookie.keys;

  onerror(app);

  app
    .use(bodyparser())

    .use(koaStatic(path.join(__dirname, '..', `../${config.dir.frontend}`)))
    .use(koaStatic(path.join(__dirname, '..', `../${config.dir.static}`)))

    .use(async (ctx, next) => {
      const start = new Date();
      await next();
      const ms = new Date() - start;
      logger.trace(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });

  app
    .use(router.routes())
    .use(router.allowedMethods());

  app.promise = new Promise((resolve, reject) => {
    const server = require('http').Server(app.callback());
    const io = require('socket.io')(server);

    io.on('connection', function(socket) {
      socket.emit('news', { hello: 'world' });
      socket.on('my other event', function (data) {
        console.log(data);
      });
    });

    server.listen(config.port, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
        logger.info(`koa listening on port ${config.port}`);
      }
    });
  });

  app.on('error', (err, ctx) => {
    logger.error('server error', err, ctx);
  });

  return app;
};
