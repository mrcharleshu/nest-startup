import { createConnection } from 'typeorm';

export const databaseProviders = [{
  provide: 'databaseConnection',
  useFactory: async () => await createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123',
    database: 'pi_book_keeping',
    charset: 'utf8',
    entities: [
      __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: true,
    logging: 'all',
  }),
}];