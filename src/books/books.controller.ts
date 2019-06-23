import { Controller, Get, Query } from '@nestjs/common';

import { Book } from './interfaces';
import { GetBooksDto } from './dtos';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
  ) {}

  @Get()
  async getBooks(@Query() query: GetBooksDto): Promise<Book[]> {
    const books: Book[] = await this.booksService.getBooks({ filter: query });
    return books;
  }
}
