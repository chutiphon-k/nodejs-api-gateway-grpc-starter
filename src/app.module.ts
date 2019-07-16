import fs from 'fs';
import path from 'path';
import { Module, ValidationPipe, OnModuleInit, HttpException } from '@nestjs/common';
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

const envPath: string = path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`);

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
        path: fs.existsSync(envPath) ? envPath : null,
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
      useValue: new RavenInterceptor({
        filters: [
          { type: HttpException, filter: (exception: HttpException) => 500 > exception.getStatus() },
        ],
      }),
    },
  ],
})

export class AppModule implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    Sentry.init({
      dsn: this.configService.get('app.sentry.dsn'),
    });
  }
}
