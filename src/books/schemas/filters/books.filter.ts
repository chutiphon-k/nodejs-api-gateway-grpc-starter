import { InputType, Field, ID } from 'type-graphql';
import { Max, IsOptional, Min } from 'class-validator';

import { Book } from '../types';
import { BooksSortType } from '../enums';
import { OneToOneHundredIntScalar } from '../../../commons/scalars';

@InputType()
export class BooksFilter implements Partial<Book> {
  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field(() => [ID], { nullable: true })
  categoryIds?: string[];

  @Field({ nullable: true })
  completed?: boolean;

  @Field({ nullable: true })
  beforeCursor?: string;

  @Min(1)
  @Max(20)
  @IsOptional()
  @Field({ nullable: true })
  limit?: OneToOneHundredIntScalar;

  @Field({ nullable: true })
  bundlePriceTier?: string;

  @Field(() => BooksSortType, { nullable: true })
  sortBy?: BooksSortType;

  @Field(() => [ID], { nullable: true })
  contentRatingIds?: string[];
}
