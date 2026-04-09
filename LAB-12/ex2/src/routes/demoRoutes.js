const express = require('express');

const router = express.Router();

// Route-level middleware chain for /secure.
function routeMiddlewareOne(req, res, next) {
  console.log('[Route Middleware 1] Checking access token...');

  if (!req.headers['x-access-token']) {
    return res.status(401).json({
      success: false,
      message: 'Access token missing. Add x-access-token header.',
    });
  }

  next();
}

function routeMiddlewareTwo(req, res, next) {
  console.log('[Route Middleware 2] Access token found, continuing...');
  next();
}

router.get('/public', (req, res) => {
  console.log('[Route Handler] /public reached.');
  res.json({
    success: true,
    route: 'public',
    receivedAt: req.receivedAt,
    message: 'Public route executed after global middleware.',
  });
});

router.get('/secure', routeMiddlewareOne, routeMiddlewareTwo, (req, res) => {
  console.log('[Route Handler] /secure reached.');
  res.json({
    success: true,
    route: 'secure',
    receivedAt: req.receivedAt,
    message: 'Secure route executed after global and route middleware.',
  });
});

module.exports = router;
