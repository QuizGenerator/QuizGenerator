import { DataSource, Repository } from "typeorm";
import { Injectable } from '@nestjs/common';
import { Quiz } from "./entities/quiz.entity";

@Injectable()
export class QuizRepository extends Repository<Quiz> {
    constructor(private dataSource: DataSource){
        super(Quiz, dataSource.createEntityManager());
    }
    
}