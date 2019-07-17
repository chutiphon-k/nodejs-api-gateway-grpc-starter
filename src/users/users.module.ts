import { Module, Scope } from '@nestjs/common';

import { UsersController } from './users.controller';
import { LoadersModule } from '../loaders/loaders.module';
import { BooksLoader } from '../loaders/loaders/books.loader';

@Module({
  imports: [LoadersModule],
  controllers: [UsersController],
  // providers: [
  //   // {
  //   //   provide: BooksLoader,
  //   //   useClass: BooksLoader,
  //   //   // scope: Scope.REQUEST,
  //   // },
  // ],
})

export class UsersModule {}
