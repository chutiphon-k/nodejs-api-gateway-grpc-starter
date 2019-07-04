import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

const tokens = ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwiaWF0IjoxNTYyMTQ5OTE1fQ.OWWVlgmAT03fs_nc_3CILIdFkYhHEuRQfUeKCfTNQaw'];

@Injectable()
export class TokenGuard implements CanActivate {
  private getToken(authorization: string) {
    return authorization.split(' ').filter(v => v !== '')[1];
  }

  private getRequest(context: ExecutionContext): Request {
    const req: Request = context.switchToHttp().getRequest();
    if (req) { return req; }
    const graphqlContext: GraphQLExecutionContext = GqlExecutionContext.create(context);
    return graphqlContext.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = this.getRequest(context);
    const { authorization } = req.headers;

    if (authorization) {
      const token = this.getToken(authorization);
      const isExist: boolean = tokens.includes(token); // check with redis
      if (!isExist) { throw new UnauthorizedException(); }
    }

    return true;
  }
}
