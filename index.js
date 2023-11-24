const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const environment = require("./config/environment");
const requestLogger = require('./src/logger/request.logger');
const logger = require("./src/logger/default.logger");
const authRouter = require("./src/routes/auth.route")
const whoAmIRouter = require("./src/routes/whoAmI.route")
//swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Payroll API",
      version: "1.0.0",
      description: "Payroll API - Express"
    },
    servers:[
      {
        url: "http://localhost:3040"
      }
    ]
  },
  apis: ["./src/routes/*.js"]
};

const specs = swaggerJsDoc(options);

const app = express();

app.use("/swagger", swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors());
app.use(express.json());

//api runing port
const PORT = environment.Port || 8080

app.use(function (req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
})


if (environment.requestLogEnable){
  requestLogger.registerRequestLogger(app);
} else {
  logger.info("Request logger disabled")
}

//Default
// app.use((req, res,next) => {
//   res.status(200).json({name:'Payroll RESTful API', author:'Madhura Liyanage'})
// }); 

//apis
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/whoami", whoAmIRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error("Error loading RESTful API endpoint. Endpoint not found.");
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
    logger.info(`server listen in ${PORT} and service started`);
});
  