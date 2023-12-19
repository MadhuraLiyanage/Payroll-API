const { token } = require("morgan");
const redis = require("redis");
const promisify = require("util.promisify");
//const { cli } = require('winston/lib/winston/config');
//const { promisify } = require('util');
const redisHelper = function () {};

/* Redis pa
//Passing user name and password to redis
//URL Base 
//redis://arbitrary_usrname:password@ipaddress:6379/0
//
//SSL
//rediss://:password=@redis-server-url:6380/0?ssl_cert_reqs=CERT_REQUIRED'
//
//Connecting to the local host
const client = redis.createClient({
  host: "localhost",
  port: 6379,
  password: "1234",
  user: "username"
});
*/

const client = redis.createClient({
  url:
    process.env.REDIS_ENVIRONMENT === "DOCKER" ? process.env.REDIS_URL : null,
  port:
    process.env.REDIS_ENVIRONMENT === "LOCAL" ? process.env.REDIS_PORT : null,
  host:
    process.env.REDIS_ENVIRONMENT === "LOCAL" ? process.env.REDIS_SERVER : null
});

(async () => {
  await client.connect();
})();

//const REDIS_SETEX = promisify(client.SETEX).bind(client); //Update Redis value pair with a expairy.
//Will be returning the values after updating Redis
//const REDIS_GET = promisify(client.GET).bind(client); //read a value pair from Redis
//const REDIS_DEL = promisify(client.DEL).bind(client); //delete a value pair from Redis

redisHelper.setRefreshToken = async (userId, refreshToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      client.SETEX(userId, process.env.REDIS_REFRESH_TOKEN_EXP, refreshToken);

      resolve();
    } catch (err) {
      throw err;
    }
  });
};

redisHelper.deleteRefreshToken = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      client.DEL(userId);

      resolve();
    } catch (err) {
      throw err;
    }
  });
};

redisHelper.validateRefreshToken = async (
  userId,
  refreshToken,
  redisBranch
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const redisStoredRefreshToken = await client.GET(redisBranch + userId);
      const result = refreshToken === redisStoredRefreshToken;
      // if (refreshToken === redisStoredRefreshToken) {
      //   resolve(true);
      //   return;
      // } else {
      //   resolve(false);
      //   return;
      // }
      resolve(result);
      return;
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
};

client.disconnect;

module.exports = redisHelper;
