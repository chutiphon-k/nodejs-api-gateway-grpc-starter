import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { ConfigService } from 'nestjs-config';

import { Book } from '../books/schemas/types';
import { BooksArgs } from '../books/schemas/args';
import { IGetMultiBooksArgs } from '../books/interfaces';

type IRequestFunction = <T = any>(config: IRequestConfig) => Observable<AxiosResponse<T>>;

class BaseRepository {
  private readonly httpService: HttpService;
  private readonly baseURL: string;
  protected request: IRequestFunction;

  constructor(config: { httpService: HttpService, baseURL: string }) {
    this.httpService = config.httpService;
    this.baseURL = config.baseURL;
    this.request = this.createRequest();
  }

  createRequest(): IRequestFunction {
    return <T = any>(config: IRequestConfig) => this.httpService.request<T>({
      baseURL: this.baseURL,
      ...config,
    });
  }
}

interface IRequestConfig extends Omit<AxiosRequestConfig, 'baseURL'> {}

interface IPagination<T = any> {
  [key: string]: T | boolean;
}
interface IBookPagination extends IPagination<Book[]> {
  books: Book[];
  next: boolean;
}

// tslint:disable-next-line: max-classes-per-file
@Injectable()
export class BooksRepository extends BaseRepository {
  private readonly config: ConfigService;

  constructor(httpService: HttpService, config: ConfigService) {
    super({
      httpService,
      baseURL: `${config.get('app.microservices.bookServiceUrl')}/books`,
    });
    this.config = config;
  }

  async getBooks(args: BooksArgs = {}): Promise<IBookPagination> {
    const config: IRequestConfig = {
      method: 'GET',
      url: '',
      params: args.filter,
    };
    const res = await this.request<IBookPagination>(config).toPromise();
    return res.data;
  }

  async getMultiBooks(args: IGetMultiBooksArgs): Promise<Book[]> {
    const config: IRequestConfig = {
      method: 'GET',
      url: '/multi',
      params: args.filter,
    };
    const res = await this.request<Book[]>(config).toPromise();
    console.log('====================================');
    console.log('eiei123');
    console.log('====================================');
    return res.data;
  }
}
