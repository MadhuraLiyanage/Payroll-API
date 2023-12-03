const { token } = require('morgan');
const redis = require('redis');
const resdisHelper = function () {};

const client = redis.createClient({
    host: process.env.REDIS_SERVER,
    port: process.env.REDIS_PORT, 
});

(async () => {
    await client.connect();
})();

resdisHelper.setRefreshTocken = async (userId, refreshToken) => {
    return new Promise((resolve, reject) => {
        try{
            client.SET(userId, refreshToken);
            resolve();
        } catch (err) {
            throw err;
        }
    });
}

client.disconnect;

module.exports = resdisHelper;