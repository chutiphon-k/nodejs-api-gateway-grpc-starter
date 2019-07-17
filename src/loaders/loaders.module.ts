import { Module } from '@nestjs/common';

import { BooksService } from '../books/books.service';
import { BooksLoader } from './loaders/books.loader';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [BooksModule],
  providers: [BooksLoader],
  exports: [BooksLoader],
})

export class LoadersModule {}
