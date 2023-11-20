import { Category } from 'src/category/entities/category.entity';

export class ReturnUserCategoryInfoDto {
  static createFrom(category: Category) {
    const returnUserCategoryDto: ReturnUserCategoryInfoDto = new ReturnUserCategoryInfoDto();
    returnUserCategoryDto.id = category.id;
    returnUserCategoryDto.department = category.department;
    returnUserCategoryDto.dataNum = category.dataNum;

    return returnUserCategoryDto;
  }
  id: number;
  department: string;
  dataNum: number;
}
