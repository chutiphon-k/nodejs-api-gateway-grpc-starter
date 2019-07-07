import {
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

@Injectable()
export class AuthGuard extends PassportAuthGuard() {
  getRequest(context: ExecutionContext): Request {
    return context.switchToHttp().getRequest() || GqlExecutionContext.create(context).getContext().req;
  }
}
