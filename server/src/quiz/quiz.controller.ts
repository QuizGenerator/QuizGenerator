import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { ReturnQuizDto } from './dto/return-quiz.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  createQuiz(@Body() createQuizDto: CreateQuizDto): Promise<boolean> {
    return this.quizService.createQuiz(createQuizDto);
  }
  
  @Get(':DataID')
  // @UseGuards(AuthGuard())
  getQuizById(@Param('DataID') dataId:number):Promise<ReturnQuizDto[]>{
    return this.quizService.getQuizById(dataId);
  }
}
