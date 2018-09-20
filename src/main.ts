import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerService, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/logging.interceptor';
import { ErrorFilter, HttpExceptionFilter } from './common/filter/http-exception.filter';
import { Logger } from './common/logger';
import { ServerConfig } from './config';
import moment = require('moment');

const logger = Logger('bootstrap');

async function bootstrap() {
  process.env.TZ = 'Asia/Shanghai';
  const app = await NestFactory.create(AppModule, { logger: new LoggerServiceImpl(), cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorFilter(), new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.setGlobalPrefix(ServerConfig.CONTEXT_PATH);
  const options = new DocumentBuilder()
    .setTitle('nestjs学习')
    .setSchemes('http')
    .setDescription('nestjs学习')
    .setVersion('1.0.0')
    .setBasePath(ServerConfig.CONTEXT_PATH)
    // .addBearerAuth('X-Authorization')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger-ui.html', app, document);
  // 统一了API的访问路径
  app.use('/v2/api-docs', (req, res) => res.json(document));
  await app.listen(ServerConfig.PORT);
}

class LoggerServiceImpl implements LoggerService {
  log(message: string) {
    logger.info(message);
  }

  error(message: string, trace: string) {
    logger.error(message);
  }

  warn(message: string) {
    logger.warn(message);
  }
}

bootstrap();

Date.prototype.toJSON = function() {
  return moment(this).format('YYYY-MM-DD HH:mm:ss');
};