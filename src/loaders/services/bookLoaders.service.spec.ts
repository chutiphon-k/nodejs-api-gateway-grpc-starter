import { Test, TestingModule } from '@nestjs/testing';
import { Scope } from '@nestjs/common';

import { BookLoadersService } from './bookloaders.service';
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
    let bookLoadersService: BookLoadersService;
    let booksRepository: BooksRepository;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          BooksRepository,
          {
            provide: BookLoadersService,
            useClass: BookLoadersService,
            scope: Scope.DEFAULT,
          },
        ],
      })
      .compile();

      bookLoadersService = module.get<BookLoadersService>(BookLoadersService);
      booksRepository = module.get<BooksRepository>(BooksRepository);
    });

    describe('getBook', () => {
      it('should init', () => {
        expect(bookLoadersService.getBook).toBeInstanceOf(CustomDataLoader);
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

        const [, book2]: Book[] = await Promise.all(resultBookIds.map(bookId => bookLoadersService.getBook.load(bookId)));

        const args: IGetMultiBooksArgs = { filter: { id: resultBookIds } };

        expect(booksRepository.getMultiBooks).toHaveBeenCalledTimes(1);
        expect(booksRepository.getMultiBooks).toHaveBeenCalledWith(args);
        expect(book2).toMatchObject(resultBook2);
      });
    });
  });

  describe('original', () => {
    let bookLoadersService: BookLoadersService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          BooksRepository,
          BookLoadersService,
        ],
      })
      .compile();

      bookLoadersService = module.get<BookLoadersService>(BookLoadersService);
    });

    describe('getBook', () => {
      it('should not init', () => {
        expect(bookLoadersService.getBook).toBeUndefined();
      });
    });
  });
});
