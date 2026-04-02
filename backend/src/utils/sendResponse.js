 const sendResponse = (
  res,
  {
    success = true,
    message = "Request successful",
    data = null,
    statusCode = 200,
    error = null,
    meta = {},
  }
) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
    error,
    meta,
    timestamp: new Date().toISOString(),
  });
};

module.exports = sendResponse;