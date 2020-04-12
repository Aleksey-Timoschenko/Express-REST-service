const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'silly',
  format: format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({
      filename: './logs/error.log',
      level: 'error',
      format: format.combine(format.uncolorize(), format.json())
    }),
    new transports.File({
      filename: './logs/info.log',
      level: 'info',
      format: format.combine(format.uncolorize(), format.json())
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple()
    })
  );
}

module.exports = logger;
