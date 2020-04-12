const logger = require('../helpers/logger.js');

const requestLog = (req, res, next) => {
  const log = {
    level: 'info',
    message: 'Request log',
    timestamp: new Date(),
    method: req.method,
    url: req.originalUrl,
    queryParams: req.query,
    body: req.body
  };

  logger.info(log);

  next();
};

module.exports = requestLog;
