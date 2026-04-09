function requestPreprocessor(req, res, next) {
  req.receivedAt = new Date().toISOString();
  console.log('[Global Preprocessor] Request metadata attached.');
  next();
}

module.exports = requestPreprocessor;
