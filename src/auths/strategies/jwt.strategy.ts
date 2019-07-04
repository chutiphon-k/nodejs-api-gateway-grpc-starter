import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthsService } from '../auths.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Req } from '@nestjs/common';

import { IJwtPayload } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      secretOrKey: 'fictionlog',
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this.authService.validateUser(payload);
    console.log('====================================');
    console.log('strategy', user);
    console.log('====================================');
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
