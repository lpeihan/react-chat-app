'use strict';

const app = require('../package.json');

module.exports = {
  host: 'localhost',
  port: 3000,
  cookie: {
    keys: [
      'APdtVf2BKugFEPO0gWQgaT0GmbWge10ZvUnRAMgBLU',
      'JRhNhZ5ru9wNY1BEqtmvfClL2zxyIr7To12k5bySm8'
    ],
    maxAge: 60000 * 60 * 24 * 30,
    prefix: 's:',
    secure: false
  },
  mongo: {
    host: 'localhost',
    port: 27017
  },
  redis: {
    host: 'localhost',
    port: 6379,
    db: 0
  },
  log: {
    level: 'trace'
  },
  jwtSecret: 'c29tZXNlY3JldGtleWZvcmpzb253ZWJ0b2tlbg',
  dir: {
    backend: 'backend',
    frontend: 'frontend',
    config: 'config',
    logs: 'logs',
    dist: 'dist',
    static: 'static'
  },
  qiniu: {
    accessKey: 'lJahtgHH7ev-77u9BS2FPhTHTlLdVm6_H8cGmLWh',
    secretKey: '5o0tncYwhnQUXgwcIDeH4mDRxZU34dHg4z63S0kY',
    bucketName: 'lpeihan',
    bucketDomain: 'ouixsc2xp.bkt.clouddn.com'
  },
  app
};
