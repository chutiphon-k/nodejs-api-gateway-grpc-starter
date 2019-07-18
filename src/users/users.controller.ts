import { Controller, Get, UseGuards, Post, Req, UnauthorizedException, Inject } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { AuthsService } from '../auths/auths.service';
import { BooksLoader } from '../loaders/loaders/books.loader';
import { BooksService } from '../books/books.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthsService,
    // private readonly booksLoader: BooksLoader,
  ) {}

  @Get('/loader')
  async testLoader(): Promise<string> {
    return 'loader';
  }

  @Get('/hello')
  getHello(): string {
    return 'hello';
  }

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
