import { ObjectType, Field, ID } from 'type-graphql';

import { JsonScalar } from '../../../commons/scalars';

@ObjectType()
export class Book {
  @Field(type => ID)
  // tslint:disable-next-line: variable-name
  _id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(type => ID)
  userId: string;

  @Field({ nullable: true })
  coverImage?: string;

  @Field(type => JsonScalar, { nullable: true })
  contentRawState?: object;

  @Field({ nullable: true })
  viewsCount?: number;

  @Field(type => [Book], { nullable: 'itemsAndList' })
  neighbors?: object;
}
