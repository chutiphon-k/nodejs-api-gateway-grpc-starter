import { Module, HttpModule } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';

import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';

@Module({
  providers: [
    BooksResolver,
    BooksService,
  ],
  exports: [BooksService],
})
export class BooksModule {}
