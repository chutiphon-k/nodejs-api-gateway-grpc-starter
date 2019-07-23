import { AxiosRequestConfig } from 'axios';
import { omit } from 'lodash';

import { IRequestConfig } from './interfaces';

export const requestConfigSerializer = (config: IRequestConfig = {}): AxiosRequestConfig => ({
  params: config.filter,
  data: config.input,
  ...omit(config, ['filter', 'input']),
});
