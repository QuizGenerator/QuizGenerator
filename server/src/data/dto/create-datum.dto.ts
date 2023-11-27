import { IsNumber, IsString } from 'class-validator';

class quiz {
  @IsString()
  quizText: string;

  @IsString()
  quizAnswer: string;
}

export class CreateDatumDto {
  @IsString()
  inputText: string;

  @IsNumber()
  difficulty: number;

  @IsString()
  type: string;

  @IsString()
  dataTitle: string;

  @IsNumber()
  quizNum: number;

  quizzes: quiz[];
}
