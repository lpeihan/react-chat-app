'use strict';

const validator = require('validator');

const User = require('../models/user');

const { isEmpty } = require('lodash');

exports.validateSignup = async function(user) {
  let errors = {};

  const { username, password, passwordConfirmation } = user;

  if (validator.isEmpty(username)) {
    errors.username = '用户名不能为空';
  }

  if (user.username && await User.findOne({ username })) {
    errors.username = '用户名已存在';
  }

  if (validator.isEmpty(password)) {
    errors.password = '密码不能为空';
  }

  if (validator.isEmpty(passwordConfirmation)) {
    errors.passwordConfirmation = '确认密码不能为空';
  }

  if (!validator.equals(password, passwordConfirmation)) {
    errors.passwordConfirmation = '两次密码不一致';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

exports.validateLogin = async function(user) {
  let errors = {};

  const { username, password } = user;

  if (validator.isEmpty(username)) {
    errors.username = '用户名不能为空';
  }

  if (validator.isEmpty(password)) {
    errors.password = '密码不能为空';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
