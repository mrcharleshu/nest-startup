import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { Photo } from './photo.entity';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('相册')
@Controller('photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {
  }

  @Get()
  async findAll(): Promise<Photo[]> {
    console.log('find all photos', await this.photoService.findAll());
    return await this.photoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe())id): Promise<Photo> {
    return await this.photoService.findOne(id);
  }
}