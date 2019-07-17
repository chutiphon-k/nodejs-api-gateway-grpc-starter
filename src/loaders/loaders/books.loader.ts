import { Injectable, HttpService, OnModuleInit, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { BooksService } from '../../books/books.service';
import { Book } from '../../books/schemas/types';

interface IBooksLoader {
  getBook: DataLoader<string, Book>;
  // createGetBook(): DataLoader<string, Book>;
}

@Injectable({ scope: Scope.REQUEST })
export class BooksLoader implements IBooksLoader {
  getBook: DataLoader<string, Book>;

  constructor(
    private readonly booksService: BooksService,
  ) {
    this.getBook = this.createGetBook();
  }

  private createGetBook(): DataLoader<string, Book> {
    return new DataLoader<string, Book>((bookIds: string[]): Promise<Book[]> => {
      console.log('====================================');
      console.log(bookIds);
      console.log('====================================');
      return this.booksService.getMultiBooks({ filter: { id: bookIds } });
    });
  }

  // getBook(bookIds: string[]): Dataloader<string, Book>{
  //   // return new Dataloader();
  //   return
  //   // return getBooks({ bookRepository: this.bookRepository }, args);
  // }
}
