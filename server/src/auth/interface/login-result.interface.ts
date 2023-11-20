import { CookieOptions } from 'express';

export interface LoginResultType {
  accessToken: string;
  cookieOption: CookieOptions;
}
