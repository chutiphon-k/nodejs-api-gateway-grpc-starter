import { Injectable, HttpService } from '@nestjs/common';

import { Book } from './schemas/types';
import { getBooks } from './services';
import { BooksArgs } from './schemas/args';

interface IBookService {
  getBooks(args: BooksArgs): Promise<Book[]>;
}

@Injectable()
export class BooksService implements IBookService {
  constructor(
    private readonly bookRepository: HttpService,
  ) {}

  async getBooks(args: BooksArgs = {}): Promise<Book[]> {
    return getBooks({ bookRepository: this.bookRepository }, args);
  }
}
