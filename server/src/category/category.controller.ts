import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ChangeCategoryDto } from './dto/change-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { getUserId } from 'src/decorator/get-user.decorator';
import { ReturnCategoryDto } from './dto/return-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Delete(':categoryID')
  @UseGuards(AuthGuard())
  remove(@getUserId() userID: number, @Param('categoryID') categoryId: number) {
    return this.categoryService.deleteCategoryById(userID, categoryId);
  }

  @Patch(':categoryID')
  @UseGuards(AuthGuard())
  update(
    @getUserId() userID: number,
    @Param('categoryID') categoryId: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(userID, categoryId, updateCategoryDto);
  }

  @Patch()
  @UseGuards(AuthGuard())
  changeCategory(@getUserId() userID: number, @Body() changeCategoryDto: ChangeCategoryDto) {
    return this.categoryService.changeCategory(userID, changeCategoryDto.DataID, changeCategoryDto.nextCID);
  }

  @Post()
  @UseGuards(AuthGuard())
  createCategory(
    @getUserId() userID: number,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ReturnCategoryDto[]> {
    return this.categoryService.createCategory(userID, createCategoryDto.Department);
  }
}
