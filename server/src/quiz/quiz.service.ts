import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizService {
  constructor(@InjectRepository(Quiz) private readonly quizRepository: Repository<Quiz>) { }

  async createQuiz(createQuizDto: CreateQuizDto): Promise<boolean> {
    try {
      const { quizText, quizAnswer, data } = createQuizDto;

      const Quiz = this.quizRepository.create({
        quizText: quizText,
        quizAnswer: quizAnswer,
        data: data,
      });

      await this.quizRepository.save(Quiz);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
