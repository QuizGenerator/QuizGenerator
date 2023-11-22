import { IsString } from 'class-validator';
import { Data } from '../../data/entities/data.entity';

export class CreateQuizDto {
  @IsString()
  quizText: string;
  @IsString()
  quizAnswer: string;
  data: Data;
}
