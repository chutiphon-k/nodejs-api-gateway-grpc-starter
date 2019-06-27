import { Module, ValidationPipe } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_PIPE } from '@nestjs/core';
import { values } from 'lodash';

import { BooksModule } from './books/books.module';
import * as scalars from './commons/scalars';

@Module({
  imports: [
    BooksModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
  ],
  providers: [
    ...values(scalars),
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})

export class AppModule {}
