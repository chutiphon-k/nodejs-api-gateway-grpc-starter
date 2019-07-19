import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';

import { Book } from './schemas/types';
import { BooksResolver } from './books.resolver';
import { BooksService } from './books.service';
import { BooksLoader } from '../loaders/loaders';

jest.mock('./books.service');
jest.mock('../loaders/loaders');

describe('BooksResolver', () => {
  let booksResolver: BooksResolver;
  let booksService: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      providers: [
        BooksResolver,
        BooksService,
        BooksLoader,
      ],
    })
    .compile();

    booksResolver = module.get<BooksResolver>(BooksResolver);
    booksService = module.get<BooksService>(BooksService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('books', () => {
    it('should return array of book', async () => {
      const results: Book[] = [
        {
          _id: '1',
          title: 'Title 1',
          userId: '1',
        },
      ];

      jest.spyOn(booksService, 'getBooks').mockImplementation(() => Promise.resolve(results));

      const books: Book[] = await booksResolver.books();

      expect(booksService.getBooks).toHaveBeenCalledTimes(1);
      expect(booksService.getBooks).toHaveBeenCalledWith({});
      expect(books).toBe(results);
    });
  });
});
