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
    const req: Request = context.switchToHttp().getRequest();
    if (req) { return req; }
    const graphqlContext: GraphQLExecutionContext = GqlExecutionContext.create(context);
    return graphqlContext.getContext().req;
  }
}
