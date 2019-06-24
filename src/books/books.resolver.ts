import { Resolver, Query } from 'type-graphql';

import { Book } from './types';
import { BooksService } from './books.service';

@Resolver(Book)
export class BooksResolver {
  constructor(
    private readonly booksService: BooksService,
  ) {}

  @Query(returns => [Book])
  books(): Promise<Book[]> {
    return this.booksService.getBooks({});
  }
}
