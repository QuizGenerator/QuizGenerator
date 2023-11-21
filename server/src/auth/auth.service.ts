import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { LoginResultType } from './interface/login-result.interface';
import { CookieOptions } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private cookieOption: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  };

  getCookieOption(): CookieOptions {
    return this.cookieOption;
  }

  async signIn(account, pass): Promise<LoginResultType> {
    const user = await this.userService.findbyAccount(account);

    //비크립트 비교
    const isPasswordMatching = await bcrypt.compare(pass, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, account: user.account };
    const accessToken = await this.jwtService.signAsync(payload);
    console.log(accessToken);
    const result: LoginResultType = {
      accessToken: accessToken,
      cookieOption: this.getCookieOption(),
    };
    return result;
  }

  async signUp(signUpDto: SignUpDto): Promise<boolean> {
    try {
      await this.userService.createOne(signUpDto);
      return true;
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException();
    }
  }
}
