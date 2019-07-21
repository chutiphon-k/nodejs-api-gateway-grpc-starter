import { HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { omit } from 'lodash';

import { IRequestConfig } from '../interfaces';

type IRequestFunction = <T>(config: IRequestConfig) => Observable<AxiosResponse<T>>;

export class BaseRepository {
  protected request: IRequestFunction;

  constructor(config: { httpService: HttpService, baseURL: string }) {
    this.request = this.createRequest(config);
  }

  private createRequest(args: { httpService: HttpService, baseURL: string }): IRequestFunction {
    return <T>(config: IRequestConfig): Observable<AxiosResponse<T>>  => args.httpService.request<T>({
      baseURL: args.baseURL,
      params: config.filter,
      data: config.input,
      ...omit(config, ['filter', 'input']),
    });
  }
}
