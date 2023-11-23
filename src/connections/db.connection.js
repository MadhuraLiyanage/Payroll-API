const mysql = require('mysql');
const env = require('../../config/environment');
//const logger = require('../logger/default.logger');

const dbConnection = mysql.createConnection({
  host:  env.DBserver,
  user: env.DBusername,
  password:  env.DBpassword,
  database: env.DB,
  port: env.DBport
});
dbConnection.connect((err) => { 
  if (err) throw err;
  console.log('Successfully connected to database (' + env.DB + ' on ' + env.DBserver + ').');
});

module.exports.dbConnection = dbConnection;