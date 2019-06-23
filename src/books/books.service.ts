import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';

import { Book } from './interfaces';
import { getBooks } from './services';

@Injectable()
export class BooksService {
  constructor(
    private readonly client: HttpService
  ) {}

  async getBooks(args: any): Promise<Book[]> {
    return getBooks(this.client, args);
  }
}
