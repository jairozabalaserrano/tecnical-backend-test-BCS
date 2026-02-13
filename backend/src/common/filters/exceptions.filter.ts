import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Catch,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const httpContext = host.switchToHttp();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const httpResponseBody = {
      statusCode: httpStatus,
      timeStamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(httpContext.getRequest()) as string,
      message:
        exception instanceof HttpException
          ? exception.getResponse()
          : HttpStatus.INTERNAL_SERVER_ERROR,
    };
    httpAdapter.reply(httpContext.getResponse(), httpResponseBody, httpStatus);
  }
}
