import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuizRepository } from './quiz.repository';

@Injectable()
export class QuizService {
  constructor (
    private quizRepository: QuizRepository,
    ){}

  async createQuiz(createQuizDto: CreateQuizDto): Promise <boolean> {
    const { quizText, quizAnswer, data } = createQuizDto;

    const Quiz = this.quizRepository.create({
      quizText: quizText,
      quizAnswer: quizAnswer,
      data: data,
    })

    await this.quizRepository.save(Quiz);
    return true;
  }

  // create(createQuizDto: CreateQuizDto) {
  //   return 'This action adds a new quiz';
  // }

  // findAll() {
  //   return `This action returns all quiz`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} quiz`;
  // }

  // update(id: number, updateQuizDto: UpdateQuizDto) {
  //   return `This action updates a #${id} quiz`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} quiz`;
  // }
}
