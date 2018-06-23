const qiniu = require('qiniu');
const config = require('../config');

const router = require('koa-router')();

const mac = new qiniu.auth.digest.Mac(
  config.qiniu.accessKey, config.qiniu.secretKey
);

router.get('/', async (ctx) => {
  const putPolicy = new qiniu.rs.PutPolicy({
    scope: config.qiniu.bucketName,
    expires: 60
  });

  const uploadToken = putPolicy.uploadToken(mac);

  ctx.body = {
    token: uploadToken,
    domain: config.qiniu.bucketDomain
  };
});

module.exports = router;
