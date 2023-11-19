import { DataSource, Repository } from "typeorm";
import { Injectable } from '@nestjs/common';
import { Data } from "./entities/data.entity";

@Injectable()
export class DataRepository extends Repository<Data> {
    constructor(private dataSource: DataSource){
        super(Data, dataSource.createEntityManager());
    }
    
}