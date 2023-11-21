class quiz {
  quizText: string;
  quizAnswer: string;
}

export class CreateDatumDto {
  inputText: string;
  difficulty: number;
  type: string;
  dataTitle: string;
  quizNum: number;
  quizzes: quiz[];
  user: number;
}
