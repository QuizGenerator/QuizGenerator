import { IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class SignUpDto {
  @IsString()
  account: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  async createEntity(): Promise<User> {
    return await User.createFrom(this.account, this.password, this.name);
  }
}
