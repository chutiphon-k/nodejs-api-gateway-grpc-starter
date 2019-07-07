import { Module, ValidationPipe } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_PIPE, APP_FILTER } from '@nestjs/core';
import { values } from 'lodash';
import { RedisModule, RedisModuleOptions } from 'nestjs-redis';
import { ConfigModule } from 'nestjs-config';

import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { AuthsModule } from './auths/auths.module';
import * as scalars from './commons/scalars';
import { HttpExceptionFilter } from './commons/filters';

const options: RedisModuleOptions[] = [{
  name: 'token',
  host: 'localhost',
  port: 6379,
  db: 0,
  retryStrategy: () => 10,
  maxRetriesPerRequest: null,
  enableOfflineQueue: true,
  enableReadyCheck: true,
  lazyConnect: true,
}];

@Module({
  imports: [
    BooksModule,
    UsersModule,
    AuthsModule,
    RedisModule.register(options),
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
  ],
})

export class AppModule {}
