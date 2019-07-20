import { HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

import { IRequestConfig } from '../interfaces';

type IRequestFunction = <T>(config: IRequestConfig) => Observable<AxiosResponse<T>>;

export class BaseRepository {
  private readonly httpService: HttpService;
  private readonly baseURL: string;
  protected request: IRequestFunction;

  constructor(config: { httpService: HttpService, baseURL: string }) {
    this.httpService = config.httpService;
    this.baseURL = config.baseURL;
    this.request = this.createRequest();
  }

  private createRequest(): IRequestFunction {
    return <T>(config: IRequestConfig): Observable<AxiosResponse<T>>  => this.httpService.request<T>({
      baseURL: this.baseURL,
      params: config.filter,
      data: config.input,
      ...config,
    });
  }
}
