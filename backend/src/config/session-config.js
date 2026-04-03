const session = require("express-session");
const { RedisStore } = require("connect-redis");

const buildSessionConfig = (redisClient) => ({
  secret: process.env.SESSION_SECRET || "your_secret_key",
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({
    client: redisClient,
    prefix: "sess:",
  }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: Number(process.env.SESSION_MAX_AGE) || 1000 * 60 * 60 * 24,
  },
});

const createSessionMiddleware = (redisClient) => session(buildSessionConfig(redisClient));

module.exports = {
  createSessionMiddleware,
  buildSessionConfig,
};