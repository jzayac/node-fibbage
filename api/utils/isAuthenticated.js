'user strict'

const config = require('../../config/config');

function isAuthenticated(req, res, next) {
  if (!config.isProduction || req.session.user) {
    return next();
  }
  res.status(403).json({ error: 'Unauthorized'});
}

module.exports = isAuthenticated;
