import { ArgsType, Field } from 'type-graphql';

import { BooksFilter } from '../filters';

@ArgsType()
export class BooksArgs {
  @Field({ nullable: true })
  owner?: boolean;

  @Field({ nullable: true })
  filter?: BooksFilter;
}
