import { Resolver, Query, Args, ResolveProperty, Parent, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Book } from './schemas/types';
import { BooksService } from './books.service';
import { AuthGuard } from '../commons/guards';
import { BooksArgs } from './schemas/args';
import { BookLoadersService } from '../loaders/services';

@Resolver(() => Book)
export class BooksResolver {
  constructor(
    private readonly booksService: BooksService,
    private readonly bookLoadersService: BookLoadersService,
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
    return this.bookLoadersService.getBook.load(book._id).then(data => data ? [data] : null);
  }
}
