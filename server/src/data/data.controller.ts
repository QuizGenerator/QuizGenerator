import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDatumDto } from './dto/create-datum.dto';
import { Data } from './entities/data.entity';
import { getUserId } from 'src/decorator/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ReturnDataDto } from './dto/return-data.dto';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post()
  @UseGuards(AuthGuard())
  createData(@getUserId() userId: number, @Body() createDatumDto: CreateDatumDto): Promise<Data> {
    return this.dataService.createData(userId, createDatumDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  getDataByUser(@getUserId() userid: number): Promise<ReturnDataDto[]> {
    return this.dataService.getDataByUser(userid);
  }

  @Get('/:categoryID')
  @UseGuards(AuthGuard())
  getDataByCategory(@getUserId() userid: number, @Param('categoryID') categoryId: number): Promise<Data[]> {
    return this.dataService.getDataByCategory(userid, categoryId);
  }

  @Delete('/:dataID')
  @UseGuards(AuthGuard())
  deleteDataById(@Param('dataID') dataId: number): Promise<boolean> {
    return this, this.dataService.deleteDataById(dataId);
  }
}
