import { Body, Controller, Post, Get, Param, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from 'src/user/user.service';
import { LoginResultType } from './interface/login-result.interface';
import { CookieOptions, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: Response) {
    const loginRes: LoginResultType = await this.authService.signIn(signInDto.userId, signInDto.password);
    res.cookie('AccessToken', loginRes.accessToken, loginRes.cookieOption);
    return;
  }

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<boolean> {
    return this.authService.signUp(signUpDto);
  }

  @Get('check')
  checkAccount(@Param('account') account: string): boolean {
    try {
      this.userService.findbyAccount(account);
      return true;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  test() {
    this.userService.getUserInfo(3);
  }
}
