import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findbyAccount(account: string): Promise<User> {
    try {
      const users: User[] = await this.userRepository.find({ where: { account: account } });
      return users[0];
    } catch (error) {
      throw error;
    }
  }

  async createOne(signUpDto: SignUpDto): Promise<User> {
    const user: User = await signUpDto.createEntity();
    await this.userRepository.save(user);
    return user;
  }

  async getUserInfo(id: number) {
    const row: User = await this.userRepository.findOne({
      relations: ['categories'],
      select: {
        id: true,
        account: true,
        name: true,
        categories: {
          id: true,
          department: true,
        },
      },
      where: { id: id },
    });
    console.log(row);
  }
}