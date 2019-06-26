import { InputType, Field, ID } from 'type-graphql';
import { Max } from 'class-validator';

import { Book } from '../types';
import { BooksSortType } from '../enums';

@InputType()
export class BooksFilter implements Partial<Book> {
  @Field(type => ID, { nullable: true })
  userId?: string;

  @Field(type => [ID], { nullable: true })
  categoryIds?: string[];

  @Field({ nullable: true })
  completed?: boolean;

  @Field({ nullable: true })
  beforeCursor?: string;

  @Field({ nullable: true })
  @Max(100)
  limit?: number;

  @Field({ nullable: true })
  bundlePriceTier?: string;

  @Field(type => BooksSortType, { nullable: true })
  sortBy?: BooksSortType;

  @Field(type => [ID], { nullable: true })
  contentRatingIds?: string[];
}
