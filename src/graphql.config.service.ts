import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { join } from 'path';
import { buildSchema } from 'type-graphql';

@Injectable()
export class GraphqlConfigService implements GqlOptionsFactory {
  async createGqlOptions(): Promise<GqlModuleOptions> {
    const schema = await buildSchema({
      nullableByDefault: true,
      resolvers: [join(__dirname, './**/*.resolver.ts')],
    });

    return {
      schema,
    };
  }
}
