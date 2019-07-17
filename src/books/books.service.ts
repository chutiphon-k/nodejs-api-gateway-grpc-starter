import { Injectable, HttpService } from '@nestjs/common';

import { Book } from './schemas/types';
import { getBooks, getMultiBooks } from './services';
import { BooksArgs } from './schemas/args';
import { IGetMultiBooksArgs } from './interfaces';

interface IBooksService {
  getBooks(args: BooksArgs): Promise<Book[]>;
}

@Injectable()
export class BooksService implements IBooksService {
  constructor(
    private readonly bookRepository: HttpService,
  ) {}

  async getBooks(args: BooksArgs = {}): Promise<Book[]> {
    return getBooks({ bookRepository: this.bookRepository }, args);
  }

  async getMultiBooks(args: IGetMultiBooksArgs): Promise<Book[]> {
    return getMultiBooks({ bookRepository: this.bookRepository }, args);
  }
}
