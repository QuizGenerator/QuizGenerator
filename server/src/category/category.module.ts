import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Data } from 'src/data/entities/data.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Data, Category])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule { }
