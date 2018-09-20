import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from './logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
    // this.logger.info('Before...');
    const now = Date.now();
    return call$.pipe(tap(() => {
      const im = context.getArgByIndex(0);
      this.logger.info(`- ${im.method} \`${im.originalUrl}\` ${Date.now() - now}ms`);
    }));
  }
}