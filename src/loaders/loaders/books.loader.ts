import { Injectable, Scope } from '@nestjs/common';
import { chain } from 'lodash';

import { Book } from '../../books/schemas/types';
import { BooksRepository } from '../../microservices/repositories';
import { CustomDataLoader } from '../custom.dataloader';

interface IBooksLoader {
  readonly getBook: CustomDataLoader<string, Book>;
}

@Injectable({ scope: Scope.REQUEST })
export class BooksLoader implements IBooksLoader {
  readonly getBook: CustomDataLoader<string, Book>;

  constructor(
    private readonly booksRepository: BooksRepository,
  ) {
    this.getBook = this.createGetBook();
  }

  private createGetBook(): CustomDataLoader<string, Book> {
    return new CustomDataLoader<string, Book>(async (ids): Promise<Book[]> => {
      const books = await this.booksRepository.getMultiBooks({ filter: { id: ids } });
      const booksSorted = chain(books).keyBy('_id').at(ids).value();
      return booksSorted;
    });
  }
}
