import { HttpService, Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { ConfigService } from 'nestjs-config';

import { ServiceName } from './enums';

interface IClientHttp {
  getService(serviceName: ServiceName): HttpService;
}

@Injectable()
export class ClientHttp implements IClientHttp {
  constructor(
    private readonly config: ConfigService,
  ) {}

  getService(serviceName: ServiceName): HttpService {
    const serviceConfig: AxiosRequestConfig = this.config.get(`microservices.services.${serviceName}`);
    if (!serviceConfig) { throw new Error('service not found'); }
    return new HttpService(axios.create(serviceConfig));
  }
}
