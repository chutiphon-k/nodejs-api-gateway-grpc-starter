import { NestFactory } from '@nestjs/core';
import cors from 'cors';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commons/filters';

const PORT = process.env.PORT || 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors(), helmet());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(PORT);
  console.log(`server listening on ${PORT}`);
}

bootstrap();
