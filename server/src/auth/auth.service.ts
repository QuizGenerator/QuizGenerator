import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { LoginResultType } from './interface/login-result.interface';
import { CookieOptions } from 'express';
import { ReturnSignInDto } from './dto/return-sign-in.dto';
import { User } from 'src/user/entities/user.entity';
import { CategoryService } from 'src/category/category.service';
import { ReturnCategoryDto } from 'src/category/dto/return-category.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly categoryService: CategoryService,
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
    user.password = undefined; //유저 비번 가리기
    const payload = { sub: user.id, account: user.account };
    const accessToken = await this.jwtService.signAsync(payload);
    const result: LoginResultType = {
      user: user,
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
      throw new InternalServerErrorException();
    }
  }

  async returnSignIn(user: User) {
    try {
      const returnSignInDto = new ReturnSignInDto();
      returnSignInDto.account = user.account;
      returnSignInDto.userID = user.id;
      returnSignInDto.name = user.name;
      const categories: ReturnCategoryDto[] = await this.categoryService.getCategories(user.id);
      returnSignInDto.returnCategories = categories;
      return returnSignInDto;
    } catch (error) {
      throw error;
    }
  }
}
