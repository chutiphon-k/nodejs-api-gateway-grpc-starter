import { InputType, Field, ID } from 'type-graphql';
import { Max } from 'class-validator';

import { Book } from '../types';
import { BooksSortType } from '../enums';
import { OneToOneHundredIntScalar } from '../../../commons/scalars';

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

  @Max(20)
  @Field({ nullable: true })
  limit?: OneToOneHundredIntScalar;

  @Field({ nullable: true })
  bundlePriceTier?: string;

  @Field(type => BooksSortType, { nullable: true })
  sortBy?: BooksSortType;

  @Field(type => [ID], { nullable: true })
  contentRatingIds?: string[];
}
