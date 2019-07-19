import { AxiosRequestConfig } from 'axios';

type OmitProperty = 'baseURL' | 'params' | 'data' | 'paramsSerializer';

export interface IRequestConfig extends Omit<AxiosRequestConfig, OmitProperty> {
  filter?: any;
  input?: any;
  filterSerializer?: (filter: any) => string;
}
