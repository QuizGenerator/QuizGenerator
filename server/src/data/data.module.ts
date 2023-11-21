import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Data } from './entities/data.entity';
import { QuizModule } from 'src/quiz/quiz.module';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Data, User]), QuizModule, UserModule],
  exports: [DataService],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
