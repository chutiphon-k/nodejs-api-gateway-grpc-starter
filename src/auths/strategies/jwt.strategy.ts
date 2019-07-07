import { IncomingHttpHeaders } from 'http';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

import { AuthsService } from '../auths.service';
import { ITokenPayload } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      secretOrKey: 'fictionlog',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: ITokenPayload): Promise<ITokenPayload> {
    const { headers: { authorization } } = req as { headers: IncomingHttpHeaders };

    const token: string = authorization.split(' ').filter(v => v !== '')[1];
    const isExist: boolean = await this.authService.checkExistToken({ token, userId: payload._id });
    if (!isExist) { throw new UnauthorizedException(); }

    return payload;
  }
}
