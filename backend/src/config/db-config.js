const path = require('path');

// load the env files
require('dotenv').config({
  path: path.resolve(__dirname, `../../env/.env.${process.env.NODE_ENV || 'development'}`),
});


const env = process.env.NODE_ENV || "development";

const buildDbConfig = () => {
  const dialect = process.env.DB_DIALECT || "postgres";

  if (process.env.DATABASE_URL) {
  return {
    use_env_variable: "DATABASE_URL",
    dialect,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  };
}

  return {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    dialect,
    logging: false,
  };
};


const config = {
  development: buildDbConfig(),
  test: buildDbConfig(),
  production: buildDbConfig(),
};

module.exports = config;