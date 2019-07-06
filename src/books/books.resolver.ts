import { Resolver, Query, Args } from '@nestjs/graphql';

import { Book } from './schemas/types';
import { BooksFilter } from './schemas/filters';
import { BooksService } from './books.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../commons/guards';

@Resolver(Book)
export class BooksResolver {
  constructor(
    private readonly booksService: BooksService,
  ) {}

  @Query(returns => [Book])
  @UseGuards(AuthGuard)
  async books(
    @Args({ name: 'owner', type: () => Boolean, nullable: true }) owner?: boolean,
    @Args({ name: 'filter', type: () => BooksFilter, nullable: true }) filter?: BooksFilter,
  ): Promise<Book[]> {
    console.log('====================================');
    console.log(owner, filter);
    console.log('====================================');
    return this.booksService.getBooks({ owner, filter });
  }
}
