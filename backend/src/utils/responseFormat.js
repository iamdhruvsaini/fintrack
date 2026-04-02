const ResponseFormat = ({
  success = true,
  message = "Request successful",
  data = null,
  statusCode = 200,
  error = null,
  meta = {},
}) => {
  return {
    success,
    message,
    statusCode,
    data,
    error,
    meta,
    timestamp: new Date().toISOString(),
  };
};