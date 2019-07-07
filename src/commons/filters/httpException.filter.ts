import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { isFunction } from 'lodash';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();

    // for graphql
    if (!isFunction(res.json)) { return exception; }

    // for rest api
    res
      .status(exception.getStatus())
      .json(exception.getResponse());
  }
}
