import { IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class SignUpDto {
  print() {
    console.log(this.account);
    console.log(this.password);
    console.log(this.name);
  }
  @IsString()
  account: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  async createEntity(): Promise<User> {
    console.log('here');
    return await User.createFrom(this.account, this.password, this.name);
  }
}
