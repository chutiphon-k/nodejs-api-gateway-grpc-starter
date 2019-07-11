import { Module, HttpModule } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';

import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        baseURL: `${configService.get('books.bookServiceUrl')}/books`,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    BooksResolver,
    BooksService,
  ],
})
export class BooksModule {}
