import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Data } from 'src/data/entities/data.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Data) private readonly dataRepository: Repository<Data>,
  ) {}
  async changeCategory(dataID: number, nextCID: number) {
    try {
      const rows: Category[] = await this.categoryRepository.find({ where: { id: nextCID } });
      if (rows.length !== 1) throw new NotFoundException(`cannot find category with id : ${nextCID}`);
      const nextCategory: Category = rows[0];

      const results = await this.dataRepository
        .createQueryBuilder()
        .update(Data)
        .set({ category: nextCategory })
        .where('id = :id', { id: dataID })
        .execute();
    } catch (error) {
      throw error;
    }
  }

  async createCategory(userID: number, department: string) {
    try {
      const rows: User[] = await this.userRepository.find({ where: { id: userID } });
      console.log(rows);
      const user = rows[0];

      await this.categoryRepository
        .createQueryBuilder()
        .insert()
        .into(Category)
        .values([{ department: department, user: user, dataNum: 0 }])
        .execute();
    } catch (error) {
      throw error;
    }
  }
}
