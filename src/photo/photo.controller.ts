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
  findAll(): Promise<Photo[]> {
    console.log('find all photos');
    return this.photoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe())id): Promise<Photo> {
    return this.photoService.findOne(id);
  }
}