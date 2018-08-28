import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  process.env.TZ = 'Asia/Shanghai';
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  const options = new DocumentBuilder()
    .setTitle('Nest startup Swagger API')
    .setDescription('Swagger API description')
    .setVersion('1.0.0')
    .setBasePath('/api/v1')
    // .addTag('cats') // 每个controller上加
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/swagger-ui.html', app, document);
  await app.listen(3000);
}

bootstrap();
