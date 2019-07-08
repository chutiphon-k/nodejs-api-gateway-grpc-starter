import { Injectable, HttpService, Inject } from '@nestjs/common';
import { pick } from 'lodash';

import { Book } from './schemas/types';
import { getBooks } from './services';
import { BooksArgs } from './schemas/args';

@Injectable()
export class BooksService {
  constructor(
    private readonly bookRepository: HttpService,
  ) {}

  async getBooks(args: BooksArgs): Promise<Book[]> {
    return getBooks.call({ bookRepository: this.bookRepository }, args);
  }
}
