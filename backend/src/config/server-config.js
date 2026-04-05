module.exports={
        "PORT": process.env.PORT || 3000,
        "CORS_ORIGIN": process.env.CORS_ORIGIN || "http://localhost:3000",
        "NODE_ENV": process.env.NODE_ENV || "development",
        "SESSION_SECRET": process.env.SESSION_SECRET,
        "UPSTASH_REDIS_URL": process.env.UPSTASH_REDIS_URL
}