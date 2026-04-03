const { createClient } = require("redis");

const buildRedisUrl = () => {
  if (process.env.UPSTASH_REDIS_URL) {
    return process.env.UPSTASH_REDIS_URL;
  }
  return null;
};

const redisConfig = {
  url: buildRedisUrl(),
};

let redisClient;

const getRedisClient = () => {
  if (redisClient) {
    return redisClient;
  }

  if (!redisConfig.url) {
    throw new Error(
      "Redis configuration missing. Set REDIS_URL or UPSTASH_REDIS_URL (or REST URL/TOKEN pair)."
    );
  }

  redisClient = createClient({
    url: redisConfig.url,
  });

  redisClient.on("connect", () => {
    console.log("Redis connected...");
  });

  redisClient.on("error", (err) => {
    console.error("Redis error:", err);
  });

  return redisClient;
};

const connectRedis = async () => {
  const client = getRedisClient();
  if (!client.isOpen) {
    await client.connect();
  }
  return client;
};

module.exports = {
  getRedisClient,
  connectRedis,
};