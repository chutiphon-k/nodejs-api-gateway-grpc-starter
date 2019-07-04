import { Module, Global } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthsService } from './auths.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'fictionlog',
    }),
  ],
  providers: [AuthsService, JwtStrategy],
  exports: [PassportModule, AuthsService],
})

export class AuthsModule {}
