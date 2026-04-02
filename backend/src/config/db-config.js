const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    USERNAME: process.env.DB_USER,
    PASSWORD: process.env.DB_PASS,
    DATABASE: process.env.DB_NAME,
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT || 5432,
    DIALECT: process.env.DB_DIALECT || "postgres",
  },

  production: {
    USERNAME: process.env.DB_USER,
    PASSWORD: process.env.DB_PASS,
    DATABASE: process.env.DB_NAME,
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT || 5432,
    DIALECT: process.env.DB_DIALECT || "postgres",
  },
};

module.exports = config[env];