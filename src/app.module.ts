import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { BooksModule } from './books/books.module';
import { GraphqlConfigService } from './graphql.config.service';

@Module({
  imports: [
    BooksModule,
    GraphQLModule.forRootAsync({
      useClass: GraphqlConfigService,
    }),
  ],
})

export class AppModule {}
