import { Module } from '@nestjs/common';

import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { LoadersModule } from '../loaders/loaders.module';

@Module({
  imports: [LoadersModule],
  providers: [
    BooksResolver,
    BooksService,
  ],
  exports: [BooksService],
})
export class BooksModule {}
