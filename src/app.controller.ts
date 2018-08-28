import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('API')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  root(): string {
    return this.appService.root();
  }
}
