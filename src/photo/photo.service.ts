import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(@Inject('PhotoRepositoryToken')
              private readonly photoRepository: Repository<Photo>) {
  }

  async findAll(): Promise<Photo[]> {
    return await this.photoRepository.find();
  }

  async findOne(id: number): Promise<Photo> {
    return await this.photoRepository.findOne(id);
  }
}