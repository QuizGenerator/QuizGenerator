import { Data } from '../../data/entities/data.entity';

export class CreateQuizDto {
  quizText: string;
  quizAnswer: string;
  data: Data;
}
