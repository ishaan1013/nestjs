import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { Request, Response } from 'express';
import { LoggingService } from './logging/logging.service';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

type ResponseObject = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | Object;
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new LoggingService(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request<Record<string, unknown>>>();

    const responseObject: ResponseObject = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: exception,
    };

    if (exception instanceof PrismaClientValidationError) {
      responseObject.statusCode = 442;
      responseObject.response = exception.message.replaceAll(/\n/g, '');
    } else if (exception instanceof HttpException) {
      responseObject.statusCode = exception.getStatus();
      responseObject.response = exception.getResponse();
    } else {
      responseObject.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      responseObject.response = 'Internal Server Error';
    }

    response.status(responseObject.statusCode).json(responseObject);

    this.logger.error(responseObject.response, AllExceptionsFilter.name);

    super.catch(exception, host);
  }
}
