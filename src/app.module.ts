import { Module, ValidationPipe } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_PIPE, APP_GUARD } from '@nestjs/core';
import { values } from 'lodash';

import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { AuthsModule } from './auths/auths.module';
import * as scalars from './commons/scalars';
import { TokenGuard } from './commons/guards';

@Module({
  imports: [
    BooksModule,
    UsersModule,
    AuthsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),
  ],
  providers: [
    ...values(scalars),
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: TokenGuard,
    },
  ],
})

export class AppModule {}
