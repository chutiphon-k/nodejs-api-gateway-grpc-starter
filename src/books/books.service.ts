import { Injectable } from '@nestjs/common';

import { getBooks, getMultiBooks } from './services';
import { IGetMultiBooksArgs } from './interfaces';
import { Book } from './schemas/types';
import { BooksArgs } from './schemas/args';
import { BooksRepository } from '../microservices/repositories';

interface IBooksService {
  getBooks(args: BooksArgs): Promise<Book[]>;
}

@Injectable()
export class BooksService implements IBooksService {
  constructor(
    private readonly bookRepository: BooksRepository,
  ) {}

  async getBooks(args: BooksArgs = {}): Promise<Book[]> {
    return getBooks({ bookRepository: this.bookRepository }, args);
  }

  async getMultiBooks(args: IGetMultiBooksArgs): Promise<Book[]> {
    return getMultiBooks({ bookRepository: this.bookRepository }, args);
  }
}
