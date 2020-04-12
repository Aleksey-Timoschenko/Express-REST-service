const logger = require('../helpers/logger.js');

const errorLog = (error, req, res) => {
  const status = error.status || 500;
  const log = {
    level: 'error',
    message: 'Network error'
  };

  logger.error(log);

  return res.status(status).send();
};

module.exports = errorLog;
