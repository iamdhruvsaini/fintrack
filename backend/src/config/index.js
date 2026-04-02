const path = require("path");
const dotenv = require("dotenv");

// decide environment
const env = process.env.NODE_ENV || "development";


dotenv.config({
  path: path.resolve(__dirname, `../../env/.env.${env}`),
});


const serverConfig = require("./server-config");
const dbConfig = require("./db-config");

module.exports = {
  serverConfig,
  dbConfig,
};