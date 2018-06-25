'use strict';

const router = require('koa-router')();

const authenticate = require('../services/auth');

router.post('/', authenticate, async (ctx) => {
  console.log('fdasfasdfdasfasf');
  ctx.status = 201;
  ctx.body = ctx.request.body;
});

module.exports = router;
