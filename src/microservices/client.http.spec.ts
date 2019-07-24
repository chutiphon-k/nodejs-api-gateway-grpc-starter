import { TestingModule, Test } from '@nestjs/testing';
import { ConfigService } from 'nestjs-config';
import { HttpService } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';

import { ClientHttp } from './client.http';

jest.mock('nestjs-config');

describe('ClientHttp', () => {
  let clientHttp: ClientHttp;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientHttp,
        ConfigService,
     ],
    }).compile();

    clientHttp = module.get <ClientHttp>(ClientHttp);
    configService = module.get <ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getService', () => {
    it('should return instance of HttpService', () => {
      const config: AxiosRequestConfig = {
        baseURL: `http://base-url/path`,
      };

      jest.spyOn(configService, 'get').mockReturnValue(config);

      const httpService = clientHttp.getService(undefined);
      expect(httpService).toBeInstanceOf(HttpService);
      expect(httpService.axiosRef.defaults).toMatchObject(config);
    });

    it('should throw error service not found', () => {
      expect(() => clientHttp.getService(undefined)).toThrow('service_not_found');
    });
  });
});
