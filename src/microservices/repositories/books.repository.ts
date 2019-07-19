import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';

import { Book } from '../../books/schemas/types';
import { BooksArgs } from '../../books/schemas/args';
import { IGetMultiBooksArgs, IBookPagination } from '../../books/interfaces';
import { BaseRepository } from './base.repository';
import { IRequestConfig } from '../interfaces';

@Injectable()
export class BooksRepository extends BaseRepository {
  constructor(httpService: HttpService, config: ConfigService) {
    super({
      httpService,
      baseURL: `${config.get('app.microservices.bookServiceUrl')}/books`,
    });
  }

  async getBooks(args: BooksArgs = {}): Promise<IBookPagination> {
    const config: IRequestConfig = {
      ...args,
      method: 'GET',
      url: '',
    };
    const res = await this.request<IBookPagination>(config).toPromise();
    return res.data;
  }

  async getMultiBooks(args: IGetMultiBooksArgs): Promise<Book[]> {
    const config: IRequestConfig = {
      ...args,
      method: 'GET',
      url: '/multi',
    };
    const res = await this.request<Book[]>(config).toPromise();
    return res.data;
  }
}
