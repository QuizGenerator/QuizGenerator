import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { Sign } from 'crypto';

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
    try {
      const user = await signUpDto.createEntity();
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserInfo(id: number) {
    const row: User = await this.userRepository.findOne({
      relations: { categories: true },
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
  }

  async getUserById(id: number): Promise<User> {
    const found = await this.userRepository.findOneBy({ id: id });
    if (!found) {
      return null;
    }
    return found;
  }
}
