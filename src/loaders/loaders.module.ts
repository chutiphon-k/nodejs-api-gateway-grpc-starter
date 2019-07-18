import { Module, Global } from '@nestjs/common';

import { BooksLoader } from './loaders/books.loader';
import { BooksModule } from '../books/books.module';

@Global()
@Module({
  // imports: [BooksModule],
  providers: [BooksLoader],
  exports: [BooksLoader],
})

export class LoadersModule {}
