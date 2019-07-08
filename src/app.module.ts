import { Module, ValidationPipe, OnModuleInit } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_PIPE, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { values } from 'lodash';
import { RedisModule } from 'nestjs-redis';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { RavenModule, RavenInterceptor } from 'nest-raven';
import * as Sentry from '@sentry/node';

import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { AuthsModule } from './auths/auths.module';
import { HttpExceptionFilter } from './commons/filters';
import * as scalars from './commons/scalars';

@Module({
  imports: [
    BooksModule,
    UsersModule,
    AuthsModule,
    RavenModule,
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get('app.redis'),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),
    ConfigModule.resolveRootPath(__dirname).load('**/!(*.d).config.{ts,js}', {
        modifyConfigName: name => name.replace('.config', ''),
    }),
  ],
  providers: [
    ...values(scalars),
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useValue: new RavenInterceptor(),
    },
  ],
})

export class AppModule implements OnModuleInit {
  constructor (
    private readonly configService: ConfigService,
  ) {}
  onModuleInit() {
    Sentry.init({
      dsn: this.configService.get('app.sentry.dsn'),
    });
  }
}
