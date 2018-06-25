'use strict';

const router = require('koa-router')();

const authenticate = require('../services/auth');

const Message = require('../models/message');
const logger = require('../utils/logger')(__filename);
const handleError = require('../utils/handleError')(logger);

router.get('/', authenticate, async (ctx) => {
  try {
    const messages = await Message.find()
      .sort({ create_date: 1 })
      .limit(100)
      .exec();
    ctx.body = messages;
  } catch (err) {
    handleError('登录失败', err, ctx);
  }
});

module.exports = router;
