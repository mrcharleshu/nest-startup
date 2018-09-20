import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { Logger } from '../logger';
import { ValidationError } from 'class-validator';

const object_values = (obj) => {
  const keys = Object.keys(obj);
  const length = keys.length;
  const values = new Array(length);
  for (let i = 0; i < length; i++) {
    values[i] = obj[keys[i]];
  }
  return values;
};

const exception_message = (exception) => {
  if (!exception) {
    return null;
  }
  if (!exception.message) {
    return JSON.stringify(exception);
  }
  if (typeof exception.message === 'string') {
    return exception.message;
  } else if (typeof exception.message.message === 'object') {
    const msg_obj = exception.message.message;
    if (Array.isArray(msg_obj) && msg_obj.length > 0 && msg_obj[0] instanceof ValidationError) {
      return object_values(msg_obj[0].constraints)[0];
    }
    return exception.message.message;
  } else if (typeof exception.message.message === 'string') {
    return exception.message.message;
  } else {
    return JSON.stringify(exception.message);
  }
};

@Catch(BadRequestException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = Logger(HttpExceptionFilter.name);

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    this.logger.error(exception.message);

    response.status(exception.getStatus()).json(exception_message(exception));
  }
}

/**
 * 用作默认的错误拦截
 * 注：可放在 @UseFilters 的第一个参数， 异常过滤会先使用后面的过滤器
 */
@Catch(Error)
export class ErrorFilter {
  private logger = Logger(ErrorFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    this.logger.error(exception.message);

    response.status(500).json(exception.message);
  }
}
