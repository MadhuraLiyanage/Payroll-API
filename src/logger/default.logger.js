const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const environment = require('../../config/environment');
 
// Import all needed using Object Destructuring
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;


module.exports = winston.createLogger({
    level: environment.logLevel,
    format: combine(
        format.errors({ stack: true }), // log the full stack
        timestamp(), // get the time stamp part of the full log message
        printf(({ level, message, timestamp, stack }) => { // formating the log outcome to show/store 
          return `${new Date()} ${level}: ${message} `;
        })
      ),
  //  format: winston.format.simple(),
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            filename: environment.logFile,
            dirname: environment.logDir,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxFiles: '14d',
            maxSize: '20m'
        })
    ]
});


//const levels = {error: 0, warn: 1,info: 2,http: 3,verbose: 4, debug: 5, silly: 6};
