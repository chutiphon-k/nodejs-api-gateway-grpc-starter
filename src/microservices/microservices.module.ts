import { Module, HttpModule, Global } from '@nestjs/common';

import { BooksRepository } from './books.repository';

@Global()
@Module({
  imports: [HttpModule],
  providers: [BooksRepository],
  exports: [BooksRepository],
})

export class MicroservicesModule {}
