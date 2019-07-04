import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

const tokens = ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwiaWF0IjoxNTYyMTQ5OTE1fQ.OWWVlgmAT03fs_nc_3CILIdFkYhHEuRQfUeKCfTNQaw'];

@Injectable()
export class AuthGuard extends PassportAuthGuard() {
  private getToken(authorization: string) {
    return authorization.split(' ').filter(v => v !== '')[1];
  }

  getRequest(context: ExecutionContext): Request {
    const req: Request = context.switchToHttp().getRequest();
    if (req) { return req; }
    const graphqlContext: GraphQLExecutionContext = GqlExecutionContext.create(context);
    return graphqlContext.getContext().req;
  }

  handleRequest(err: Error, user: any, info: any, context: ExecutionContext) {
    const req: Request = this.getRequest(context);
    const { authorization } = req.headers;

    if (err) { throw err; }

    if (authorization) {
      if (!user) { throw new UnauthorizedException(); }
      const token = this.getToken(authorization);
      const isExist: boolean = tokens.includes(token);
      if (!isExist) { throw new UnauthorizedException(); }
    }

    return user;
  }
}
