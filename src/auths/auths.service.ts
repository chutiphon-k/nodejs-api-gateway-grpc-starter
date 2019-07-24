import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Redis } from 'ioredis';

import { ITokenPayload, ITokenDetail, IAddToken, IGetTokenDetail } from './interfaces';
import { REDIS_REPOSITORY } from './auths.constants';
import { tokenDetailSerializer, tokenDetailDeserializer } from './auths.util';

@Injectable()
export class AuthsService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(REDIS_REPOSITORY) private redisRepository: Redis,
  ) {}

  async addToken(args: IAddToken): Promise<boolean> {
    const payload: ITokenDetail = { lastAccessedAt: Date.now(), createdAt: Date.now() };
    const res: number = await this.redisRepository.hset(`{user}:${args.userId}`, `token:${args.token}`, tokenDetailSerializer(payload));
    return !!res;
  }

  async getTokenDetail(args: IGetTokenDetail): Promise<ITokenDetail> {
    const { userId, token } = args;
    const res: string = await this.redisRepository.hget(`{user}:${userId}`, `token:${token}`);
    return tokenDetailDeserializer(res);
  }

  async checkExistToken(args: IGetTokenDetail): Promise<boolean> {
    const tokenDetail: ITokenDetail = await this.getTokenDetail(args);

    if (tokenDetail) {
      const tokenDetailUpdated: ITokenDetail = { ...tokenDetail, lastAccessedAt: Date.now() };
      await this.redisRepository.hset(`{user}:${args.userId}`, `token:${args.token}`, tokenDetailSerializer(tokenDetailUpdated));
    }

    return !!tokenDetail;
  }

  async signIn(): Promise<string> {
    const user: ITokenPayload = { _id: '1' };
    return this.jwtService.sign(user);
  }
}
