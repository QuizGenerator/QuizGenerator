import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataRepository } from './data.repository';
import { Data } from './entities/data.entity'
import { QuizModule } from 'src/quiz/quiz.module';
import { QuizService } from 'src/quiz/quiz.service';
import { QuizRepository } from 'src/quiz/quiz.repository';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Data]) ,QuizModule],
  exports: [DataService],
  controllers: [DataController],
  providers: [DataService, DataRepository, QuizService, QuizRepository],
})
export class DataModule {}
