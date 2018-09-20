import * as log4js from 'log4js';
import { ServerConfig } from '../config';

log4js.configure({
  appenders: {
    out: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '%d %z %p -% %[[%X{filename}]%] %m',
      },
    },
  },
  categories: {
    default: { appenders: ['out'], level: ServerConfig.LOGGER_LEVEL },
  },
});

export function Logger(filename) {
  const logger = log4js.getLogger();
  logger.addContext('filename', filename);
  return logger;
}
