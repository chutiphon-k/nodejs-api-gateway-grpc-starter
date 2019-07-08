import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/common';

import { Book } from '../schemas/types';
import { BooksArgs } from '../schemas/args';

export async function getBooks(this: { bookRepository: HttpService }, args: BooksArgs): Promise<Book[]> {
  const res: AxiosResponse = await this.bookRepository.get('/', { params: args.filter }).toPromise();
  return res.data.books;
}
