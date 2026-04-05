const session = require("express-session");
const { RedisStore } = require("connect-redis");
const serverConfig = require("./server-config");

const buildSessionConfig = (redisClient) => ({
  secret: serverConfig.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({
    client: redisClient,
    prefix: "sess:",
  }),
  cookie: {
    httpOnly: true,
    secure: serverConfig.NODE_ENV === "production",
    sameSite: serverConfig.NODE_ENV === "production" ? "none" : "lax",
    maxAge: Number(serverConfig.SESSION_MAX_AGE) || 1000 * 60 * 60 * 24,
  },
});

const createSessionMiddleware = (redisClient) => session(buildSessionConfig(redisClient));

module.exports = {
  createSessionMiddleware,
  buildSessionConfig,
};