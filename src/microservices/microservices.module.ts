import { Module, HttpModule, Global } from '@nestjs/common';
import { values } from 'lodash';

import * as repositories from './repositories';

const classRepositories = values(repositories);

@Global()
@Module({
  imports: [HttpModule],
  providers: [...classRepositories],
  exports: [...classRepositories],
})

export class MicroservicesModule {}
