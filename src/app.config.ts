import { RedisModuleOptions } from 'nestjs-redis';

interface IAppConfig {
  port: number;
  redis: RedisModuleOptions[];
}

export default {
  port: process.env.PORT || 8000,
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
} as IAppConfig;
