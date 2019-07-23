import { Module, Global } from '@nestjs/common';
import { values } from 'lodash';

import * as repositories from './repositories';
import { ClientHttp } from './client.http';

const classRepositories = values(repositories);

@Global()
@Module({
  providers: [...classRepositories, ClientHttp],
  exports: [...classRepositories],
})

export class MicroservicesModule {}
