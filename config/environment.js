module.exports = {
    nodeEnv: process.env.ENV || process.env.NODE_ENV || "production",
    logDir: "logs",
    logLevel: "info",
    logFile: "payroll.log",
    requestLogFile: process.env.MORGAN_LOG || "payroll-requests.log",
    requestLogEnable: process.env.REQUEST_LOG_ENABLED || "true",
    requestLogFormat:
      "[:date[iso]] :method :url :status :response-time ms - :res[content-length]",
    requestLogRollingInterval: process.env.MORGAN_LOG_ROLLING_INTERVAL || "1d",
 
    //Payroll DB settings
    DB: "payrolldb",
    DBusername: "root",
    DBpassword: "maddog",
    DBserver: "localhost",
    DBport: "3306",
    Port: "3040",
    ACCESS_TOKEN_SECRET: "Madhura@Liyanage",
    REFRESH_TOKEN_SECRET: "Indu@Liyanage" ,
    JWT_TOKEN_EXP: "20m",
    ISSUER: "madhura@srilanka",
  };