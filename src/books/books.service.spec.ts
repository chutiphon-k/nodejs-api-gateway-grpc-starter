import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService, HttpStatus } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';

import { BooksService } from './books.service';
import { Book } from './schemas/types';

describe('BooksService', () => {
  let bookService: BooksService;
  let bookRepository: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [BooksService],
    }).compile();

    bookService = module.get<BooksService>(BooksService);
    bookRepository = module.get<HttpService>(HttpService);
  });

  describe('Get books', () => {
    it('should return array of books', async () => {
      const results: Book[] = [
        {
          _id: '1',
          title: 'Title 1',
          userId: '1',
        },
      ];

      const httpStatusCode = HttpStatus.OK;
      const axiosResponse: AxiosResponse<{ books: Book[] }> = {
        data: { books: results },
        status: httpStatusCode,
        statusText: HttpStatus[httpStatusCode],
        headers: {},
        config: {},
      };

      jest.spyOn(bookRepository, 'get').mockImplementation(() => of(axiosResponse));

      const books: Book[] = await bookService.getBooks();

      expect(bookRepository.get).toHaveBeenCalledTimes(1);
      expect(bookRepository.get).toHaveBeenCalledWith('/', {});
      expect(books).toBe(results);
    });
  });
});
