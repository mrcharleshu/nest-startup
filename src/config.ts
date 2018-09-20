import { LoggerOptions } from 'typeorm/logger/LoggerOptions';

export const ServerConfig = {
  PORT: 9090,
  CONTEXT_PATH: '/api/v1',
  LOGGER_LEVEL: 'debug',
};

export const MySQLConfig = {
  MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'nestjs_test',
  MYSQL_HOST: process.env.MYSQL_HOST || '127.0.0.1',
  MYSQL_PORT: mysql_port(),
  MYSQL_USERNAME: process.env.MYSQL_USERNAME || 'root',
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || '123',
  MYSQL_LOGGER: mysql_logger(),
};

function mysql_port(): number {
  if (process.env.MYSQL_PORT) {
    return parseInt(process.env.MYSQL_PORT, 10);
  } else {
    return 3306;
  }
}

function mysql_logger(): LoggerOptions {
  switch (process.env.MYSQL_LOGGER) {
    case 'info':
      return ['info', 'log'];
    case 'warn':
      return ['warn', 'log'];
    default:
      return 'all';
  }
}
