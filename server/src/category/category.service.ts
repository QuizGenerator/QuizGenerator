import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Data } from 'src/data/entities/data.entity';

@Injectable()
export class CategoryService {
  constructor(
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
}
