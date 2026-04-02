
const express = require("express");
const cors = require("cors");
const { serverConfig } = require("./config");
const { sendResponse } = require("./utils");

const app = express();
const PORT = serverConfig.PORT;
const morgan = require('morgan');
const db = require("./models");



// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  sendResponse(res, {
    message: "Welcome to FinTrack API"
  });
});





app.use((err, req, res, next) => {
  sendResponse(res, {
    success: false,
    message: err.message || "Internal Server Error",
    statusCode: err.status || 500
  });
});


const startServer = async () => {
  try {
    await db.sequelize.authenticate(); // or mongoose.connect()

    console.log("Database connected...");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to connect to DB:", error);
    process.exit(1);
  }
};

startServer();