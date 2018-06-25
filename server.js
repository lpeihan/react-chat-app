'use strict';

// Set default node environment to production
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const config = require('./backend/config');
const koa = require('./backend/config/koa');
const mongoose = require('./backend/config/mongoose');
const log4js = require('./backend/config/log4js');
const utils = require('./backend/utils');

log4js(config);
const logger = utils.logger(__filename);

// Server
const app = koa(config);

// Mongoose
const mongooseClient = mongoose(config);

async function server() {
  try {
    await Promise.all([
      app.promise,
      mongooseClient.promise
    ]);

    logger.info(`${config.app.name} start success`);
  } catch (err) {
    logger.fatal('start failed', err);
  }
}

server();

process.on('uncaughtException', (err) => {
  logger.fatal('uncaughtException', err);
  process.nextTick(() => process.exit(1));
});
