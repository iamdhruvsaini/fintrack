
const express = require("express");
const cors = require("cors");
const { serverConfig } = require("./config");
const { sendResponse } = require("./utils");

const app = express();
const PORT = serverConfig.PORT;
const morgan = require('morgan');


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


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});