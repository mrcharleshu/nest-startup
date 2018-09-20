import { createConnection } from 'typeorm';
import { MySQLConfig } from '../config';

export const databaseProviders = [{
  provide: 'databaseConnection',
  useFactory: async () => await createConnection({
    type: 'mysql',
    host: MySQLConfig.MYSQL_HOST,
    port: MySQLConfig.MYSQL_PORT,
    username: MySQLConfig.MYSQL_USERNAME,
    password: MySQLConfig.MYSQL_PASSWORD,
    database: MySQLConfig.MYSQL_DATABASE,
    charset: 'utf8',
    entities: [
      __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: true,
    logging: MySQLConfig.MYSQL_LOGGER,
  }),
}];