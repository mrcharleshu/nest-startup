import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

// @Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
})

export class CatsModule {
  constructor(private readonly catsService: CatsService) {
  }
}