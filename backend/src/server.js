
const express = require("express");
const cors = require("cors");
const { serverConfig, connectRedis } = require("./config");
const { sendResponse } = require("./utils");
const v1ApiRoutes = require('./routes/index');
const app = express();
const PORT = serverConfig.PORT;
const morgan = require('morgan');
const db = require("./models");
const passport = require("./config/passport-config");
const { createSessionMiddleware } = require("./config/session-config");


// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use(passport.initialize());

app.get("/", (req, res) => {
  sendResponse(res, {
    message: "Welcome to FinTrack API"
  });
});


const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connected...");

    const redisClient = await connectRedis();

    app.use(createSessionMiddleware(redisClient));
    app.use(passport.session());

    // Routes
    app.use("/api", v1ApiRoutes);

    // error handling middleware
    app.use((err, req, res, next) => {
      sendResponse(res, {
        success: false,
        message: err.message || "Internal Server Error",
        statusCode: err.status || 500
      });
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();