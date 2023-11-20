import { IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class SignUpDto {
  createEntity() {
    return User.createFrom(this.account, this.password, this.name);
  }
  @IsString()
  account: string;

  @IsString()
  password: string;

  @IsString()
  name: string;
}
