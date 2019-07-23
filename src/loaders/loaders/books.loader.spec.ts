import { Test, TestingModule } from '@nestjs/testing';
import { Scope } from '@nestjs/common';

import { BooksLoader } from './books.loader';
import { BooksRepository } from '../../microservices/repositories';
import { CustomDataLoader } from '../custom.dataloader';
import { Book } from '../../books/schemas/types';
import { IGetMultiBooksArgs } from '../../books/interfaces';

jest.mock('../../microservices/repositories');

describe('BooksLoader', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('override scope to singleton', () => {
    let booksLoader: BooksLoader;
    let booksRepository: BooksRepository;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          BooksRepository,
          {
            provide: BooksLoader,
            useClass: BooksLoader,
            scope: Scope.DEFAULT,
          },
        ],
      })
      .compile();

      booksLoader = module.get<BooksLoader>(BooksLoader);
      booksRepository = module.get<BooksRepository>(BooksRepository);
    });

    describe('getBook', () => {
      it('should init', () => {
        expect(booksLoader.getBook).toBeInstanceOf(CustomDataLoader);
      });

      it ('should return book', async () => {
        const resultBook1: Book = {
          _id: '1',
          title: 'Title 1',
          userId: '1',
        };
        const resultBook2: Book = {
            _id: '2',
            title: 'Title 2',
            userId: '2',
        };
        const resultBooks: Book[] = [resultBook1, resultBook2];
        const resultBookIds: string[] = resultBooks.map(({ _id }) => _id);

        jest.spyOn(booksRepository, 'getMultiBooks').mockReturnValue(Promise.resolve(resultBooks));

        const [, book2]: Book[] = await Promise.all(resultBookIds.map(bookId => booksLoader.getBook.load(bookId)));

        const args: IGetMultiBooksArgs = { filter: { id: resultBookIds } };

        expect(booksRepository.getMultiBooks).toHaveBeenCalledTimes(1);
        expect(booksRepository.getMultiBooks).toHaveBeenCalledWith(args);
        expect(book2).toMatchObject(resultBook2);
      });
    });
  });

  describe('original', () => {
    let booksLoader: BooksLoader;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          BooksRepository,
          BooksLoader,
        ],
      })
      .compile();

      booksLoader = module.get<BooksLoader>(BooksLoader);
    });

    describe('getBook', () => {
      it('should not init', () => {
        expect(booksLoader.getBook).toBeUndefined();
      });
    });
  });
});
