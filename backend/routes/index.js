'use strict';

const Router = require('koa-router');
const send = require('koa-send');
const path = require('path');

const user = require('./user');
const article = require('./article');
const qiniu = require('./qiniu');

async function html(ctx) {
  await send(ctx, 'index.html', {
    root: path.join(__dirname, '..', '../frontend')
  });
}

const router = new Router();

router
  .use('/api/users', user.routes(), user.allowedMethods())
  .use('/api/articles', article.routes(), article.allowedMethods())
  .use('/api/qiniu', qiniu.routes(), qiniu.allowedMethods())

  .all('/', html);

module.exports = router;
