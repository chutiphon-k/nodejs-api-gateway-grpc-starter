import { Book } from '../schemas/types';
import { BooksArgs } from '../schemas/args';
import { BooksRepository } from '../../microservices/repositories';

interface IBookServiceInstance {
  readonly bookRepository: BooksRepository;
}

export async function getBooks(bookServiceInstance: IBookServiceInstance, args: BooksArgs): Promise<Book[]> {
  const { books } = await bookServiceInstance.bookRepository.getBooks(args);
  return books;
}
