import { Controller, Get, UseGuards, Post, Req, UnauthorizedException, Inject } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { AuthsService } from '../auths/auths.service';
import { BooksLoader } from '../loaders/loaders/books.loader';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthsService,
    private readonly booksLoader: BooksLoader,
  ) {}

  @Get('/loader')
  async testLoader(): Promise<string> {
    console.log('====================================');
    console.log(this.booksLoader);
    console.log('====================================');
    const [x, y] = await Promise.all([
      this.booksLoader.getBook.load('5b827405b3b2c013c2f56d2c'),
      this.booksLoader.getBook.load('5b704e705e0a2b1180cf25ef'),
    ]);

    const z = await this.booksLoader.getBook.load('5b827405b3b2c013c2f56d2c');
    console.log('====================================');
    console.log(z);
    console.log('====================================');
    // const x = await this.booksLoader.getBook.load('5b827405b3b2c013c2f56d2c');
    // const y = await this.booksLoader.getBook.load('5b704e705e0a2b1180cf25ef');
    // console.log('====================================');
    // console.log(x);
    // console.log(y);
    // console.log('====================================');
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
