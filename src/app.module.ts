import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [CatsModule, PhotoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
