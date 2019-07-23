import { Injectable, HttpService } from '@nestjs/common';

import { Book } from '../../books/schemas/types';
import { BooksArgs } from '../../books/schemas/args';
import { IGetMultiBooksArgs, IBookPagination } from '../../books/interfaces';
import { ClientHttp } from '../client.http';
import { ServiceName } from '../enums';
import { requestConfigSerializer } from '../microservices.util';

@Injectable()
export class BooksRepository {
  private readonly bookHttpService: HttpService;

  constructor(
    client: ClientHttp,
  ) {
    this.bookHttpService = client.getService(ServiceName.BookService);
  }

  async getBooks(args: BooksArgs = {}): Promise<IBookPagination> {
    const res = await this.bookHttpService.get<IBookPagination>('', requestConfigSerializer(args)).toPromise();
    return res.data;
  }

  async getMultiBooks(args: IGetMultiBooksArgs): Promise<Book[]> {
    const res = await this.bookHttpService.get<Book[]>('/multi', requestConfigSerializer(args)).toPromise();
    return res.data;
  }
}
