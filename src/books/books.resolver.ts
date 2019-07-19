import { Resolver, Query, Args, ResolveProperty, Parent, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Book } from './schemas/types';
import { BooksService } from './books.service';
import { AuthGuard } from '../commons/guards';
import { BooksArgs } from './schemas/args';
import { BooksLoader } from '../loaders/loaders/books.loader';

@Resolver(() => Book)
export class BooksResolver {
  constructor(
    private readonly booksService: BooksService,
    private readonly booksLoader: BooksLoader,
  ) {}

  @Query(() => [Book], { nullable: 'itemsAndList' })
  async books(@Args() args: BooksArgs = {}): Promise<Book[]> {
    return this.booksService.getBooks(args);
  }

  @Mutation(() => Book, { nullable: true })
  @UseGuards(AuthGuard)
  async createBook() {
    return { _id: 'test', userId: 'userIdTest' };
  }

  @ResolveProperty(() => [Book])
  async neighbors(@Parent() book: Book): Promise<Book[]> {
    return this.booksLoader.getBook.load(book._id).then(data => data ? [data] : null);
  }
}
