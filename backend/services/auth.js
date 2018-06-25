'use strict';

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');

async function authenticate(ctx, next) {
  const authorizationHeader = ctx.req.headers['authorization'];

  let token;
  let user;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    await jwt.verify(token, config.jwtSecret, async (err, decoded) => {
      if (err) {
        ctx.status = 401;
        ctx.body = '用户没有登录';
      } else {
        user = await User.findById(decoded.id);
        if (user) {
          ctx.user = user;
          await next();
        } else {
          ctx.status = 401;
          ctx.body = '用户没有登录';
        }
      }
    });
  } else {
    ctx.status = 401;
    ctx.body = '用户没有登录';
  }
}

module.exports = authenticate;
