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

  @Get('/:id')
  getDataById(@Param('id') id: number) : Promise<Data> {
    return this.dataService.getDataById(id);
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
