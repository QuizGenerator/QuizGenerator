import { IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  account: string;

  @IsString()
  password: string;
}
