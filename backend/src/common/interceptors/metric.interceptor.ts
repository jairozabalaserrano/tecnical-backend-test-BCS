import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { Observable, tap } from 'rxjs';

@Injectable()
export class MetricsInterceptor {
  constructor(
    @InjectMetric('http_request_total')
    private readonly httpRequestTotal: Counter<string>,
    @InjectMetric('http_request_duration_seconds')
    private readonly httpRequestDurationSeconds: any,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const path = request.route?.path || request.path;
    const method = request.method;
    const labels = { method, path };
    this.httpRequestTotal.inc(labels);
    const end = this.httpRequestDurationSeconds.startTimer(labels);
    return next.handle().pipe(
      tap(() => {
        end();
      }),
    );
  }
}
