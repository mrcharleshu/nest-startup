import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { RolesGuard } from '../roles.guard';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('猫')
@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private readonly catsService: CatsService) {
  }

  @Post()
  async create(@Res() res, @Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    res.status(HttpStatus.CREATED).send(this.catsService.findAll());
  }

  @Get()
  async findAll(@Req() request, @Res() res): Promise<Cat[]> {
    // res.status(HttpStatus.OK).json([]);
    return this.catsService.findAll();
  }

  @Get('byAge/:age')
  async findByAge(@Param('age', new ParseIntPipe())age): Promise<any[]> {
    return this.catsService.findAll().filter(cat => cat.age === age);
  }

  @Get('byOwner/:age')
  findByOwner(): Observable<any[]> {
    return of([]);
  }

  @Get(':id')
  findOne(@Param() params) {
    console.log(params.id);
    return {};
  }
}