import { Book } from '../schemas/types';
import { BooksArgs } from '../schemas/args';
import { BooksRepository } from '../../microservices/repositories';
import { IBookPagination } from '../interfaces';

interface IBookServiceInstance {
  readonly bookRepository: BooksRepository;
}

export async function getBooks(bookServiceInstance: IBookServiceInstance, args: BooksArgs): Promise<Book[]> {
  const bookData: IBookPagination = await bookServiceInstance.bookRepository.getBooks(args);
  return bookData.books;
}
