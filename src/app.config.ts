import { RedisModuleOptions } from 'nestjs-redis';

interface IConfig {
  readonly nodeEnv: string;
  readonly port: number;
  readonly redis: RedisModuleOptions[];
  readonly microservices: {
    [key: string]: string;
  };
  readonly sentry?: {
    dsn: string,
  };
}

const config: IConfig = {
  nodeEnv: process.env.NODE_ENV,
  port: +process.env.PORT || 8000,
  redis: [
    {
      name: 'token',
      host: process.env.REDIS_URL,
      port: 6379,
      db: 0,
      enableOfflineQueue: true,
      enableReadyCheck: true,
      lazyConnect: true,
    },
  ],
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
  microservices: {
    bookServiceUrl: process.env.BOOK_SERVICE_URL,
  },
};

export default  config;
