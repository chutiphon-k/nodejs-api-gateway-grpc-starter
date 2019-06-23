import { Book } from '../interfaces';

const books: Book[] = [{
  _id: '1',
  title: 'book1',
  description: 'aaa',
  userId: 'a',
  converImage: 'https://github.com/microsoft/TypeScript/issues/2709',
}];

export async function getBooks(args: any): Promise<Book[]> {
  const { filter } = args;
  console.log('====================================');
  console.log(filter);
  console.log('====================================');
  return Promise.resolve(books);
}