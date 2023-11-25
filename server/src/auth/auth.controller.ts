import { Body, Controller, Post, Get, Param, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from 'src/user/user.service';
import { LoginResultType } from './interface/login-result.interface';
import { CookieOptions, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { GetUser } from 'src/decorator/get-user.decorator';
import { ReturnSignInDto } from './dto/return-sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: Response) {
    const loginRes: LoginResultType = await this.authService.signIn(signInDto.account, signInDto.password);
    res.header('AccessToken', loginRes.accessToken);
    return await this.authService.returnSignIn(loginRes.user);
  }

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<boolean> {
    const signUp: SignUpDto = new SignUpDto();
    signUp.account = signUpDto.account;
    signUp.password = signUpDto.password;
    signUp.name = signUpDto.name;
    return await this.authService.signUp(signUp);
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
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user);
  }
}
