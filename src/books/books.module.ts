import { Module, HttpModule } from '@nestjs/common';

import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BooksResolver } from './books.resolver';

@Module({
  imports: [HttpModule],
  controllers: [BooksController],
  providers: [BooksService, BooksResolver],
})
export class BooksModule {}
