import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { Book } from '../../books/schemas/types';
import { BooksRepository } from '../../microservices/books.repository';

interface IBooksLoader {
  getBook: DataLoader<string, Book>;
}

@Injectable({ scope: Scope.REQUEST })
export class BooksLoader implements IBooksLoader {
  getBook: DataLoader<string, Book>;

  constructor(
    private readonly booksRepository: BooksRepository,
  ) {
    this.getBook = this.createGetBook();
  }

  private createGetBook(): DataLoader<string, Book> {
    return new DataLoader<string, Book>((bookIds: string[]): Promise<Book[]> => {
      return this.booksRepository.getMultiBooks({ filter: { id: bookIds } });
    });
  }
}
