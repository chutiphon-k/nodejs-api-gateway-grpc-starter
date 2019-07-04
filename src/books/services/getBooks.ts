import { AxiosResponse } from 'axios';

import { Book } from '../schemas/types';

export async function getBooks(args: any): Promise<Book[]> {
  const res: AxiosResponse = await this.client.get('http://35.240.252.57/books', { ...args.filter }).toPromise();
  return res.data.books;
}
