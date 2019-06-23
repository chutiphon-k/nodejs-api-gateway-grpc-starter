import { Injectable } from '@nestjs/common';

import { Book } from './interfaces';
import { getBooks } from './services';

@Injectable()
export class BooksService {
  async getBooks(args: any): Promise<Book[]> {
    return getBooks(args);
  }
}
