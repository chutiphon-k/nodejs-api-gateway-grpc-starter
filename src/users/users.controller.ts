import { Controller, Get, UseGuards, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { AuthsService } from '../auths/auths.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthsService,
  ) {}

  @Post('login')
  async login(): Promise<string> {
    const token: string = await this.authService.signIn();
    return token;
  }

  @Get('check-auth')
  @UseGuards(AuthGuard())
  checkAuth(
    @Req() req: Request,
  ): any {
    return req.user;
  }
}
