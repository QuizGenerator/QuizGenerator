import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ChangeCategoryDto } from './dto/change-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Patch()
  changeCategory(@Body() changeCategoryDto: ChangeCategoryDto) {
    return this.categoryService.changeCategory(changeCategoryDto.DataID, changeCategoryDto.nextCID);
  }
}
