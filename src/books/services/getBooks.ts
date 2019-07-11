import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/common';

import { Book } from '../schemas/types';
import { BooksArgs } from '../schemas/args';

interface IBookServiceInstance {
  readonly bookRepository: HttpService;
}

export async function getBooks(bookServiceInstance: IBookServiceInstance, args: BooksArgs = {}): Promise<Book[]> {
  const res = await bookServiceInstance.bookRepository.get<{ books: Book[] }>('/', { params: args.filter }).toPromise();
  return res.data.books;
}
