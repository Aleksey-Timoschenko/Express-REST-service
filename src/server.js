const { PORT } = require('./common/config');
const logger = require('./helpers/logger');
const app = require('./app');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

process.on('uncaughtException', err => {
  const log = {
    level: 'error',
    message: 'Uncaught exception',
    stack: err.stack
  };

  logger.error(log).on('finish', () => {
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  });
});

process.on('unhandledRejection', err => {
  const log = {
    level: 'error',
    message: 'Unhandled rejection',
    stack: err.stack
  };

  logger.error(log).on('finish', () => {
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  });
});
