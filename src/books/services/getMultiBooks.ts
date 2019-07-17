import { HttpService } from '@nestjs/common';

import { Book } from '../schemas/types';
import { IGetMultiBooksArgs } from '../interfaces';

interface IBookServiceInstance {
  readonly bookRepository: HttpService;
}

export async function getMultiBooks(bookServiceInstance: IBookServiceInstance, args: IGetMultiBooksArgs): Promise<Book[]> {
  console.log('====================================');
  console.log('eiei');
  console.log('====================================');
  const res = await bookServiceInstance.bookRepository.get<Book[]>('/multi', { params: args.filter }).toPromise();
  return res.data;
}
