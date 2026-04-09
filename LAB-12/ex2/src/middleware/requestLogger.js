function requestLogger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[Global Logger] ${timestamp} | ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = requestLogger;
