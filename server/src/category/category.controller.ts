import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ChangeCategoryDto } from './dto/change-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoryService.deleteCategoryById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }


  @Patch()
  changeCategory(@Body() changeCategoryDto: ChangeCategoryDto) {
    return this.categoryService.changeCategory(changeCategoryDto.DataID, changeCategoryDto.nextCID);
  }
}
