import { HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';

import { Book } from '../schemas/types';

export async function getBooks(client: HttpService, args: any): Promise<Book[]> {
  const res: AxiosResponse = await client.get('http://35.240.252.57/books', { ...args.filter }).toPromise();
  return res.data.books;
}
