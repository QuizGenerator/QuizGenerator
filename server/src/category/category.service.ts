import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Data } from 'src/data/entities/data.entity';
import { User } from 'src/user/entities/user.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ReturnCategoryDto } from './dto/return-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Data) private readonly dataRepository: Repository<Data>,
  ) {}
  async deleteCategoryById(id: number): Promise<ReturnCategoryDto> {
    try {
      const data = await this.categoryRepository.find({ where: { id: id }, relations: { datas: { quizzes: true } } });
      const result = await this.categoryRepository.softRemove(data);
      return { CategoryId: result[0].id, Department: result[0].department, DataNum: result[0].dataNum };
    } catch (error) {
      throw error;
    }
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<ReturnCategoryDto> {
    try {
      const { department } = updateCategoryDto;
      await this.categoryRepository
        .createQueryBuilder()
        .update(Category)
        .set({ department: department })
        .where({ id: id })
        .execute();
      const category = await this.categoryRepository.find({ where: { id: id } });
      return { CategoryId: category[0].id, Department: category[0].department, DataNum: category[0].dataNum };
    } catch (error) {
      throw error;
    }
  }

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

  async createCategory(userID: number, department: string): Promise<ReturnCategoryDto[]> {
    try {
      const rows: User[] = await this.userRepository.find({ where: { id: userID } });
      const user = rows[0];

      const rows1 = await this.categoryRepository
        .createQueryBuilder()
        .insert()
        .into(Category)
        .values([{ department: department, user: user, dataNum: 0 }])
        .execute();
      const rows2 = await this.categoryRepository.find({});
      const result: ReturnCategoryDto[] = rows2.map((category) => {
        return category.createDto();
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getCategories(userID: number): Promise<ReturnCategoryDto[]> {
    const rows2: Category[] = await this.categoryRepository.find({ where: { user: { id: userID } } });
    const returnCategoryDto: ReturnCategoryDto[] = rows2.map((category: Category) => {
      return category.createDto();
    });

    return returnCategoryDto;
  }
}
