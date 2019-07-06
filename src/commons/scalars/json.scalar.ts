import { CustomScalar, Scalar } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { GraphQLScalarType, ValueNode } from 'graphql';

@Scalar('Json')
export class JsonScalar implements CustomScalar<object, object> {
  description: string;
  private graphQLScalarType: GraphQLScalarType;

  constructor() {
    this.graphQLScalarType = GraphQLJSON;
    this.description = this.graphQLScalarType.description;
  }

  parseValue(value: object): object {
    return this.graphQLScalarType.parseValue(value);
  }

  serialize(value: object): object {
    return this.graphQLScalarType.serialize(value);
  }

  parseLiteral(ast: ValueNode): object {
    return this.graphQLScalarType.parseLiteral(ast, null);
  }
}
