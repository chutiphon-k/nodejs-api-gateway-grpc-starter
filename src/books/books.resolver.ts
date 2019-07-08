import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Book } from './schemas/types';
import { BooksService } from './books.service';
import { AuthGuard } from '../commons/guards';
import { BooksArgs } from './schemas/args';

@Resolver(Book)
export class BooksResolver {
  constructor(
    private readonly booksService: BooksService,
  ) {}

  @Query(() => [Book])
  // @UseGuards(AuthGuard)
  async books(@Args() args: BooksArgs): Promise<Book[]> {
    return this.booksService.getBooks(args);
  }
}
