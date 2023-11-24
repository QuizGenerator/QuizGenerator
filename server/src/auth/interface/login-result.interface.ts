import { CookieOptions } from 'express';
import { User } from 'src/user/entities/user.entity';

export interface LoginResultType {
  user: User;
  accessToken: string;
  cookieOption: CookieOptions;
}
