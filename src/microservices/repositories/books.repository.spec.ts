
import { Test, TestingModule } from '@nestjs/testing';
import { HttpService, HttpStatus } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';

import { BooksRepository } from './books.repository';
import { IBookPagination, IGetMultiBooksArgs } from '../../books/interfaces';
import { Book } from '../../books/schemas/types';
import { ClientHttp } from '../client.http';
import { requestConfigSerializer } from '../microservices.util';

jest.mock('@nestjs/common/http');
const mockHttpService: HttpService = new HttpService();
jest.mock('../client.http', () => ({
  ClientHttp: jest.fn().mockImplementation(() => ({
    getService: jest.fn().mockReturnValue(mockHttpService),
  })),
}));

describe('BooksRepository', () => {
  let bookRepository: BooksRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksRepository,
        ClientHttp,
     ],
    }).compile();

    bookRepository = module.get <BooksRepository>(BooksRepository);
  });

  describe('getBooks', () => {
    it('should return book pagination', async () => {
      const result: IBookPagination = {
        books: [
          {
            _id: '1',
            title: 'Title 1',
            userId: '1',
          },
        ],
        next: false,
      };

      const httpStatusCode = HttpStatus.OK;
      const axiosResponse: AxiosResponse<IBookPagination> = {
        data: result,
        status: httpStatusCode,
        statusText: HttpStatus[httpStatusCode],
        headers: {},
        config: {},
      };

      const spiedGet: jest.SpyInstance = jest.spyOn(mockHttpService, 'get');
      spiedGet.mockReturnValue(of(axiosResponse));

      const bookPagination: IBookPagination = await bookRepository.getBooks();

      expect(mockHttpService.get).toHaveBeenCalledTimes(1);
      expect(mockHttpService.get).toHaveBeenCalledWith('', requestConfigSerializer({}));
      expect(bookPagination).toMatchObject(result);

      spiedGet.mockReset();
    });
  });

  describe('getMultiBooks', () => {
    it('should return array of books', async () => {
      const results: Book[]  = [
        {
          _id: '1',
          title: 'Title 1',
          userId: '1',
        },
      ];

      const httpStatusCode = HttpStatus.OK;
      const axiosResponse: AxiosResponse<Book[]> = {
        data: results,
        status: httpStatusCode,
        statusText: HttpStatus[httpStatusCode],
        headers: {},
        config: {},
      };

      const spiedGet: jest.SpyInstance = jest.spyOn(mockHttpService, 'get');
      spiedGet.mockReturnValue(of(axiosResponse));

      const args: IGetMultiBooksArgs = { filter: { id: ['1'] } };
      const books: Book[] = await bookRepository.getMultiBooks(args);

      expect(mockHttpService.get).toHaveBeenCalledTimes(1);
      expect(mockHttpService.get).toHaveBeenCalledWith('/multi', requestConfigSerializer(args));
      expect(books).toMatchObject(results);

      spiedGet.mockReset();
    });
  });
});
