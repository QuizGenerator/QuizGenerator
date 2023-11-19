import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataRepository } from './data.repository';
import { Data } from './entities/data.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Data])],
  exports: [DataService],
  controllers: [DataController],
  providers: [DataService, DataRepository],
})
export class DataModule {}
