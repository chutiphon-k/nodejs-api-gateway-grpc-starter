import { Module, HttpModule } from '@nestjs/common';

import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';

@Module({
  imports: [HttpModule],
  providers: [BooksResolver, BooksService],
})
export class BooksModule {}
