import { Module, Global } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { RedisService } from 'nestjs-redis';

import { AuthsService } from './auths.service';
import { JwtStrategy } from './strategies';
import { REDIS_REPOSITORY } from './auths.constants';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'fictionlog',
    }),
  ],
  providers: [
    AuthsService,
    JwtStrategy,
    {
      provide: REDIS_REPOSITORY,
      useFactory: (redisService: RedisService) => redisService.getClient('token'),
      inject: [RedisService],
    },
  ],
  exports: [PassportModule, AuthsService],
})

export class AuthsModule {}
