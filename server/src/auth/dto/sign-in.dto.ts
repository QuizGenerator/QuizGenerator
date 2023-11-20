import { IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  userId: string;

  @IsString()
  password: string;
}
