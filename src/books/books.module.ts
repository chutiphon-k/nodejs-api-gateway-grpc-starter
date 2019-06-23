import { Module, HttpModule } from '@nestjs/common';

import { BooksService } from './books.service';
import { BooksController } from './books.controller';

@Module({
  imports: [HttpModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
