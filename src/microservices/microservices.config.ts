import { AxiosRequestConfig } from 'axios';

import { ServiceName } from './enums';

interface IConfig {
  readonly services: {
    [key in ServiceName]: AxiosRequestConfig;
  };
}

const config: IConfig = {
  services: {
    bookService: {
      baseURL: `${process.env.BOOK_SERVICE_URL}/books`,
    },
    userService: {
      baseURL: `${process.env.USER_SERVICE_URL}/users`,
    },
  },
};

export default  config;
