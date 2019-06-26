import { Module, ValidationPipe } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_PIPE } from '@nestjs/core';

import { BooksModule } from './books/books.module';
import { JsonScalar } from './commons/scalars/json.scalar';

@Module({
  imports: [
    BooksModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
  ],
  providers: [
    JsonScalar,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ]
})

export class AppModule {}
