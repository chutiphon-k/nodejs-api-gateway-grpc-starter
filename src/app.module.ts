import { Module, ValidationPipe } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_PIPE, APP_FILTER } from '@nestjs/core';
import { values } from 'lodash';
import { RedisModule } from 'nestjs-redis';
import { ConfigModule, ConfigService } from 'nestjs-config';

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
  ],
})

export class AppModule {}
