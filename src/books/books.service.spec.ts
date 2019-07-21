import { Test, TestingModule } from '@nestjs/testing';

import { BooksService } from './books.service';
import { Book } from './schemas/types';
import { IGetMultiBooksArgs } from './interfaces';
import { BooksRepository } from '../microservices/repositories';

jest.mock('../microservices/repositories');

describe('BooksService', () => {
  let bookService: BooksService;
  let bookRepository: BooksRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService, BooksRepository],
    }).compile();

    bookService = module.get<BooksService>(BooksService);
    bookRepository = module.get<BooksRepository>(BooksRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
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

      jest.spyOn(bookRepository, 'getBooks').mockImplementation(() => Promise.resolve({ books: results, next: false }));

      const books: Book[] = await bookService.getBooks();

      expect(bookRepository.getBooks).toHaveBeenCalledTimes(1);
      expect(bookRepository.getBooks).toHaveBeenCalledWith({});
      expect(books).toEqual(results);
    });
  });

  describe('Get multi books', () => {
    it('should return array of books', async () => {
      const results: Book[] = [
        {
          _id: '1',
          title: 'Title 1',
          userId: '1',
        },
      ];

      jest.spyOn(bookRepository, 'getMultiBooks').mockImplementation(() => Promise.resolve(results));

      const args: IGetMultiBooksArgs = { filter: { id: ['1'] } };
      const books: Book[] = await bookService.getMultiBooks(args);

      expect(bookRepository.getMultiBooks).toHaveBeenCalledTimes(1);
      expect(bookRepository.getMultiBooks).toHaveBeenCalledWith({ filter: args.filter });
      expect(books).toEqual(results);
    });
  });
});
