import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizRepository } from './quiz.repository';
import { Quiz } from "./entities/quiz.entity";
import { DataModule } from 'src/data/data.module';
import { DataRepository } from 'src/data/data.repository';
import { DataService } from 'src/data/data.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz])],
  exports: [QuizService],
  controllers: [QuizController],
  providers: [QuizService, QuizRepository],
})
export class QuizModule {}
