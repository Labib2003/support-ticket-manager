import { DrizzleError, DrizzleQueryError } from 'drizzle-orm';
import { DatabaseError } from 'pg';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';

@Catch(DrizzleError, DrizzleQueryError, DatabaseError)
export class DbExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const message =
      exception.cause?.message ||
      exception.detail ||
      exception.message ||
      'A database error occurred.';

    const badRequest = new BadRequestException('Database error', {
      description: message,
    });

    response.status(badRequest.getStatus()).json(badRequest.getResponse());
  }
}
