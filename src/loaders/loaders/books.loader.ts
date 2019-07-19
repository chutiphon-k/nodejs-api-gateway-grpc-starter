import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { Book } from '../../books/schemas/types';
import { BooksRepository } from '../../microservices/repositories';
import { CustomDataLoader } from '../loaders.util';

interface IBooksLoader {
  readonly getBook: DataLoader<string, Book>;
}

@Injectable({ scope: Scope.REQUEST })
export class BooksLoader implements IBooksLoader {
  readonly getBook: DataLoader<string, Book>;

  constructor(
    private readonly booksRepository: BooksRepository,
  ) {
    this.getBook = this.createGetBook();
  }

  private createGetBook(): DataLoader<string, Book> {
    return new CustomDataLoader<string, Book>((bookIds): Promise<Book[]> => {
      return this.booksRepository.getMultiBooks({ filter: { id: bookIds } });
    });
  }
}
