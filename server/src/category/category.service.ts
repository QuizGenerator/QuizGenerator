import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { DataService } from 'src/data/data.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ReturnCategoryDto } from './dto/return-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    private dataService: DataService,
  ) { }
  async deleteCategoryById(id: number): Promise<ReturnCategoryDto> {
    const data = await this.categoryRepository.find({ where: { id: id }, relations: { datas: { quizzes: true } } })
    const result = await this.categoryRepository.softRemove(data);
    console.log(result);
    return ({ CategoryId: result[0].id, Department: result[0].department, DataNum: result[0].dataNum });
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<ReturnCategoryDto> {
    const { department } = updateCategoryDto
    const result = await this.categoryRepository
      .createQueryBuilder()
      .update(Category)
      .set({ department: department })
      .where({ id: id })
      .execute()
    const category = await this.categoryRepository.find({ where: { id: id } })
    return ({ CategoryId: category[0].id, Department: category[0].department, DataNum: category[0].dataNum });
  }
}
