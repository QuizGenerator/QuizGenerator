import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthRepository } from './auth.repository';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private authRepository:AuthRepository){}

  async createUser(createAuthDto: CreateAuthDto): Promise <User> {
    const {userId, name} = createAuthDto;


    const User = this.authRepository.create({
      userId: userId,
      name: name,
    })
    await this.authRepository.save(User);
    return User;
  }

  async getUserById(id: number): Promise<User> {
    const found = await this.authRepository.findOneBy({id:id});
    if (!found) {
      return null;
    }
    return found;
  }

  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: string) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
