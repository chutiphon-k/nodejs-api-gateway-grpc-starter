import { CustomScalar, Scalar } from '@nestjs/graphql';
import { GraphQLInputInt } from 'graphql-input-number';
import { GraphQLScalarType, ValueNode } from 'graphql';

const GraphqlOneToOneHundredInt: GraphQLScalarType = GraphQLInputInt({
  name: 'OneToOneHundredInt',
  min: 1,
  max: 100,
});

@Scalar('OneToOneHundredInt')
export class OneToOneHundredIntScalar implements CustomScalar<number, number> {
  description: string;
  private graphQLScalarType: GraphQLScalarType;

  constructor() {
    this.graphQLScalarType = GraphqlOneToOneHundredInt;
    this.description = this.graphQLScalarType.description;
  }

  parseValue(value: number): number {
    return GraphqlOneToOneHundredInt.parseValue(value);
  }

  serialize(value: number): number {
    return GraphqlOneToOneHundredInt.serialize(value);
  }

  parseLiteral(ast: ValueNode): number {
    return GraphqlOneToOneHundredInt.parseLiteral(ast, null);
  }
}
