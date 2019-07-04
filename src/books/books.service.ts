import { Injectable, HttpService } from '@nestjs/common';

import { Book } from './schemas/types';
import { getBooks } from './services';

@Injectable()
export class BooksService {
  constructor(
    private readonly client: HttpService,
  ) {}

  async getBooks(args: any): Promise<Book[]> {
    return getBooks.call(this, args);
  }
}
