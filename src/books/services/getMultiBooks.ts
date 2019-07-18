import { Book } from '../schemas/types';
import { IGetMultiBooksArgs } from '../interfaces';
import { BooksRepository } from '../../microservices/books.repository';

interface IBookServiceInstance {
  readonly bookRepository: BooksRepository;
}

export async function getMultiBooks(bookServiceInstance: IBookServiceInstance, args: IGetMultiBooksArgs): Promise<Book[]> {
  const books = await bookServiceInstance.bookRepository.getMultiBooks(args);
  return books;
}
