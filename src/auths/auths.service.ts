import { Injectable } from '@nestjs/common';
import { find } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './interfaces/jwtPayload.interface';

const users = [{ _id: '1', name: 'A', token: 'tokenA' }, { _id: '2', name: 'B', token: 'tokenB' }];

@Injectable()
export class AuthsService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async signIn(): Promise<string> {
    const user: IJwtPayload = { _id: '1' };
    return this.jwtService.sign(user);
  }

  async validateUser(payload: IJwtPayload): Promise<any> {
    return payload;
  }
}