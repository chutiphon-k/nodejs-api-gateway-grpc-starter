import { Test, TestingModule } from '@nestjs/testing';
import { HttpService, HttpStatus } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';

import { BooksRepository } from './books.repository';
import { IBookPagination, IGetMultiBooksArgs } from '../../books/interfaces';
import { Book } from '../../books/schemas/types';

const BOOK_SERVICE_URL = 'http://base-url-book-service';
const BASE_URL = `${BOOK_SERVICE_URL}/books`;

jest.mock('@nestjs/common/http');

describe('BooksRepository', () => {
  let bookRepository: BooksRepository;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksRepository,
        HttpService,
        ConfigService,
        {
          provide: ConfigService,
          useValue: new ConfigService({
            app: {
              microservices: {
                bookServiceUrl: BOOK_SERVICE_URL,
              },
            },
          }),
        },
     ],
    }).compile();

    bookRepository = module.get <BooksRepository>(BooksRepository);
    httpService = module.get<HttpService>(HttpService);
  });

  afterEach(() => {
    jest.resetAllMocks();
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

      jest.spyOn(httpService, 'request').mockImplementation(() => of(axiosResponse));

      const bookPagination: IBookPagination = await bookRepository.getBooks();

      expect(httpService.request).toHaveBeenCalledTimes(1);
      expect(httpService.request).toHaveBeenCalledWith({ baseURL: BASE_URL, method: 'GET' });
      expect(bookPagination).toMatchObject(result);
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

      jest.spyOn(httpService, 'request').mockImplementation(() => of(axiosResponse));

      const args: IGetMultiBooksArgs = { filter: { id: ['1'] } };
      const books: Book[] = await bookRepository.getMultiBooks(args);

      expect(httpService.request).toHaveBeenCalledTimes(1);
      expect(httpService.request).toHaveBeenCalledWith({ baseURL: BASE_URL, method: 'GET', url: '/multi', params: args.filter });
      expect(books).toMatchObject(results);
    });
  });
});
