import { ObjectType, Field, ID } from 'type-graphql';

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
}
