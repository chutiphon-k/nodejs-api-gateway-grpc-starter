import { CustomScalar, Scalar } from '@nestjs/graphql';
import * as GraphQlBigInt from 'graphql-bigint';
import { GraphQLScalarType, ValueNode} from 'graphql';

@Scalar('BigInt')
export class BigIntScalar implements CustomScalar<number, number> {
  description: string;
  private graphQLScalarType: GraphQLScalarType;

  constructor() {
    this.graphQLScalarType = GraphQlBigInt;
    this.description = this.graphQLScalarType.description;
  }

  parseValue(value: number): number {
    return this.graphQLScalarType.parseValue(value);
  }

  serialize(value: number): number {
    return this.graphQLScalarType.serialize(value);
  }

  parseLiteral(ast: ValueNode): number {
    return this.graphQLScalarType.parseLiteral(ast, null);
  }
}
