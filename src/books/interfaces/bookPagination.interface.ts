import { IPagination } from '../../commons/interfaces';
import { Book } from '../schemas/types';

export interface IBookPagination extends IPagination<Book> {
  books: Book[];
  next: boolean;
}
