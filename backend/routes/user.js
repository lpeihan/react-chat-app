'use strict';

const router = require('koa-router')();
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const logger = require('../utils/logger')(__filename);
const handleError = require('../utils/handleError')(logger);

const config = require('../config');
const { validateSignup, validateLogin } = require('../services/user');
const authenticate = require('../services/auth');
const _ = require('lodash');

/*
 * signup
 */
router.post('/signup', async (ctx) => {
  try {
    const { isValid, errors } = await validateSignup(ctx.request.body);

    if (isValid) {
      const { username, password, avatar } = ctx.request.body;

      const user = new User({ username, password, avatar });
      await user.save();

      const token = jwt.sign({
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        sex: user.sex
      }, config.jwtSecret);

      ctx.body = token;
    } else {
      ctx.status = 400;
      ctx.body = errors;
    }
  } catch (err) {
    handleError('注册失败', err, ctx);
  }
});

/*
 * login
 */
router.post('/login', async (ctx) => {
  try {
    const { isValid, errors } = await validateLogin(ctx.request.body);

    if (isValid) {
      const user = await User.findOne({
        username: ctx.request.body.username
      });

      if (user && await user.authenticate(ctx.request.body.password)) {
        const token = jwt.sign({
          id: user.id,
          username: user.username,
          avatar: user.avatar,
          sex: user.sex
        }, config.jwtSecret);

        ctx.body = token;
      } else {
        errors.password = '用户名或密码错误';
        ctx.status = 401;
        ctx.body = errors;
      }
    } else {
      ctx.status = 401;
      ctx.body = errors;
    }
  } catch (err) {
    handleError('登录失败', err, ctx);
  }
});

/*
 * modify-my-info
 */
router.post('/my', authenticate, async (ctx) => {
  try {
    const user = await User.findById(ctx.user._id);

    _.assign(user, ctx.request.body);

    await user.save();

    const token = jwt.sign({
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      sex: user.sex
    }, config.jwtSecret);

    ctx.body = token;
  } catch (err) {
    handleError('修改用户信息失败', err, ctx);
  }
});

module.exports = router;
