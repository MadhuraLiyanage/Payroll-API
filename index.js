require("dotenv").config();
const express = require("express");
const cors = require("cors");
const requestLogger = require("./src/logger/request.logger");
const logger = require("./src/logger/default.logger");
const authRouter = require("./src/routes/auth.route");
const whoAmIRouter = require("./src/routes/whoAmI.route");
const logoutRouter = require("./src/routes/logout.route");
const authenticateMiddleware = require("./src/middleware/authenticate.mw");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerJsDocs = YAML.load("./payrollApi.yaml");
const responseTime = require("response-time");

const app = express();
app.use(responseTime());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

app.use(cors());
app.use(express.json());

//api running port
const PORT = process.env.PORT || 8080;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

if (process.env.REQUEST_LOG_ENABLE) {
  requestLogger.registerRequestLogger(app);
} else {
  logger.info("Request logger disabled");
}

//Default
// app.use((req, res,next) => {
//   res.status(200).json({name:'Payroll RESTful API', author:'Madhura Liyanage'})
// });

//apis
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/auth/refresh-token", authRouter);
//app.use("/api/v1/logout", logoutRouter);
app.use("/api/v1/who-am-i", authenticateMiddleware, whoAmIRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error(
    "Payroll RESTfull API. Error loading requested endpoint. Endpoint not found."
  );
  err.httpStatusCode = 404;
  return next(err);
});

// error handler
app.use((err, req, res, next) => {
  const status = err.httpStatusCode || 500;
  const message = err.message;
  res.status(status).json({ message: message });
});

app.listen(PORT, () => {
  logger.info(`Server listening to port ${PORT} and service started`);
});
