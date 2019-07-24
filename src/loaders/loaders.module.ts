import { Module } from '@nestjs/common';
import { values } from 'lodash';

import * as loaderServices from './services';

const loaderServiceProviders = values(loaderServices);

@Module({
  providers: [...loaderServiceProviders],
  exports: [...loaderServiceProviders],
})

export class LoadersModule {}
