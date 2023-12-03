const { token } = require("morgan");
const redis = require("redis");
const promisify = require("util.promisify");
//const { cli } = require('winston/lib/winston/config');
//const { promisify } = require('util');
const resdisHelper = function () {};

const client = redis.createClient({
  host: process.env.REDIS_SERVER,
  port: process.env.REDIS_PORT,
});

(async () => {
  await client.connect();
})();

//const REDIS_SETEX = promisify(client.SETEX).bind(client); //Update Redis value pair with a expairy.
//Will be returning the values after updating Redis
//const REDIS_GET = promisify(client.GET).bind(client); //read a value pair from Redis
//const REDIS_DEL = promisify(client.DEL).bind(client); //delete a value pair from Redis

resdisHelper.setRefreshTocken = async (userId, refreshToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      client.SETEX(userId, process.env.REDIS_REFRESH_TOKEN_EXP, refreshToken);

      resolve();
    } catch (err) {
      throw err;
    }
  });
};

client.disconnect;

module.exports = resdisHelper;
