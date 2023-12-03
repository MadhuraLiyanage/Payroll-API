const { token } = require('morgan');
const redis = require('redis');
const resdisHelper = function () {};

const client = redis.createClient({
    host: '127.0.0.1', //process.env.REDIS_SERVER,
    port: 6379, //process.env.REDIS_PORT, 
});

(async () => {
    await client.connect();
})();

resdisHelper.setRefreshTocken = async (userId, refreshToken) => {
    return new Promise((resolve, reject) => {
        try{
            client.SET(userId, refreshToken);
            client.disconnect();
            resolve();
        } catch (err) {
            client.disconnect();
            console.log(err.message);
            throw err;
        }
    });
}

module.exports = resdisHelper;