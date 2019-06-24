import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class Book {
  @Field(type => ID)
  // tslint:disable-next-line: variable-name
  _id: string;

  @Field()
  title?: string;

  @Field()
  description?: string;

  @Field(type => ID)
  userId?: string;

  @Field()
  coverImage?: string;
}
