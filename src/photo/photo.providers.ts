import { Connection } from 'typeorm';
import { Photo } from './photo.entity';

export const photoProviders = [{
  provide: 'photoRepository',
  useFactory: (connection: Connection) => connection.getRepository(Photo),
  inject: ['databaseConnection'],
}];