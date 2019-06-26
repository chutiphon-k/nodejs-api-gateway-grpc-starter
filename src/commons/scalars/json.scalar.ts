import { CustomScalar, Scalar } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@Scalar('Json', type => JSON)
export class JsonScalar implements CustomScalar<object, object> {
  description = GraphQLJSON.description;

  parseValue(value: object): object {
    return GraphQLJSON.parseValue(value);
  }

  serialize(value: object): object {
    return GraphQLJSON.serialize(value);
  }

  parseLiteral(ast: any): object {
    return GraphQLJSON.parseLiteral(ast, undefined);
  }
}
