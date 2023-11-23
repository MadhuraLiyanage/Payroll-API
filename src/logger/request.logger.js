const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const environment = require('../../config/environment');

// rotating stream for morgan
const accessLogStream = rfs.createStream(environment.requestLogFile, {
    size: "10M",
    interval: environment.requestLogRollingInterval,
    path: environment.logDir
});

// appenders for printing the logs to console and file
const consoleAppender = morgan(environment.requestLogFormat);
const fileAppender = morgan(environment.requestLogFormat, {
    stream: accessLogStream
});

// function to inject morgan in an express app
exports.registerRequestLogger = (app) => {
    app.use(consoleAppender);

    // log to file only in `production`
    if (environment.nodeEnv === 'production') {
        app.use(fileAppender);
    }
};