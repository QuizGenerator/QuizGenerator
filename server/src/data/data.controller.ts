import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDatumDto } from './dto/create-datum.dto';
import { UpdateDatumDto } from './dto/update-datum.dto';
import { Data } from "./entities/data.entity"

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  // @Post()
  // create(@Body() createDatumDto: CreateDatumDto) {
  //   return this.dataService.create(createDatumDto);
  // }

  @Post()
  createData(@Body() createDatumDto: CreateDatumDto): Promise<Data> {
    return this.dataService.createData(createDatumDto);
  }

  @Get('/:userid')
  getDataByUser(@Param('userid') userid: number) : Promise<Data[]> {
    return this.dataService.getDataByUser(userid);
  }

  @Get('/:userid/:categoryid')
  getDataByCategory(@Param('userid') userid: number, @Param('categoryid')  categoryid: number,) : Promise<Data []> {
    return this.dataService.getDataByCategory(userid, categoryid);
  }

  @Delete('/:id')
  deleteDataById(@Param('id') id: number) : Promise<boolean>{
    return this,this.dataService.deleteDataById(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.dataService.findOne(id);
  // }

  // @Get()
  // findAll() {
  //   return this.dataService.findAll();
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.dataService.remove(id);
  // }
}
