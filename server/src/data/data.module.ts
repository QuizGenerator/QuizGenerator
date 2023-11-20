import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataRepository } from './data.repository';
import { Data } from './entities/data.entity'
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthRepository } from 'src/auth/auth.repository';
import { QuizModule } from 'src/quiz/quiz.module';
import { QuizService } from 'src/quiz/quiz.service';
import { QuizRepository } from 'src/quiz/quiz.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Data]), AuthModule, QuizModule],
  exports: [DataService],
  controllers: [DataController],
  providers: [DataService, DataRepository,  AuthRepository, AuthService, QuizService, QuizRepository],
})
export class DataModule {}
