import { ReturnCategoryDto } from 'src/category/dto/return-category.dto';

export class ReturnSignInDto {
  userID: number;
  account: string;
  name: string;
  returnCategories: ReturnCategoryDto[];
}
