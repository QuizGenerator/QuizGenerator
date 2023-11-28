import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), TypeOrmModule.forFeature([Quiz])],
  exports: [QuizService],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
