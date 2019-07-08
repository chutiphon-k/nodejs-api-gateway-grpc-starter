import { NestFactory } from '@nestjs/core';
import cors from 'cors';
import helmet from 'helmet';
import { ConfigService } from 'nestjs-config';
import compression from 'compression';
// import { Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commons/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors(), helmet(), compression());
  // app.connectMicroservice({
  //   transport: Transport.REDIS,
  //   options: {
  //     url: 'redis://localhost:6379',
  //   },
  // });
  const PORT = ConfigService.get('app.port');
  await app.listen(PORT);
  console.log(`server listening on ${PORT}`);
}

bootstrap();
