const path = require('path');

// load the env files
require('dotenv').config({
  path: path.resolve(__dirname, `../../env/.env.${process.env.NODE_ENV || 'development'}`),
});


const env = process.env.NODE_ENV || "development";


const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME, 
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || "postgres",
  },

  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || "postgres",
  },
};

module.exports = config;