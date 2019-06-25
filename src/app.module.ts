import { Module, ValidationPipe } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_PIPE } from '@nestjs/core';

import { BooksModule } from './books/books.module';

@Module({
  imports: [
    BooksModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ]
})

export class AppModule {}
