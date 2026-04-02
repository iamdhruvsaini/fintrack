require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { ResponseFormat } = require("./utils");


const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
 




app.use((err, req, res, next) => {

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

ResponseFormat
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});