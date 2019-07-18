import { Module } from '@nestjs/common';
import { values } from 'lodash';

import * as loaders from './loaders';

const loaderProviders = values(loaders);

@Module({
  providers: [...loaderProviders],
  exports: [...loaderProviders],
})

export class LoadersModule {}
