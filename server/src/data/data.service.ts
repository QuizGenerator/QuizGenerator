import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDatumDto } from './dto/create-datum.dto';
import { DataRepository } from './data.repository';
import { Data } from "./entities/data.entity"
import { AuthService } from "../auth/auth.service"
import { QuizService } from 'src/quiz/quiz.service';

@Injectable()
export class DataService {

  constructor(
    private dataRepository: DataRepository,
    private authService: AuthService,
    private quizService: QuizService,
  ){}

  async createData(createDatumDto: CreateDatumDto): Promise <Data> {
    const {inputText, difficulty, type, dataTitle, quizNum, quizzes, user} = createDatumDto;
    const uid = await this.authService.getUserById(user);
    if(uid === null){
      return null;
    }

    const Data = await this.dataRepository.create({
      inputText: inputText,
      difficulty: difficulty,
      type: type,
      dataTitle: dataTitle,
      quizNum: quizNum,
      user: uid,
      category: null,
    })

    const createdData = await this.dataRepository.save(Data);

    for(const quiz of quizzes){
      await this.quizService.createQuiz({
        quizText: quiz.quizText,
        quizAnswer: quiz.quizAnswer,
        data: createdData,
      })
    }
    return Data;
  }

  async getDataByUser(userid: number): Promise<Data []> {
    const user = await this.authService.getUserById(userid);
    const found = user ? await this.dataRepository.find({where : {user: { id : user.id }}}) : null;
    return found || [];
  }

  async getDataByCategory(userid: number, categoryid: number): Promise<Data []> {
    const user = await this.authService.getUserById(userid);
    const found = user ? await this.dataRepository.find({where : {user: { id : user.id }} && {category: { id : categoryid}}}) : null;
    return found || [];
  }

  async deleteDataById(id: number): Promise<boolean>{
    const result = await this.dataRepository.delete(id);
  
    if (result.affected === 0) {
      return false; 
    }
    return true;
  }

  // create(createDatumDto: CreateDatumDto) {
  //   const {inputText, difficulty, type, dataTitle, quiz} = createDatumDto;
  //   const Data = {
  //     id: uuid(),
  //     inputText: inputText,
  //     difficulty: difficulty,
  //     type: type,
  //     dataTitle: dataTitle,
  //     quiz: quiz
  //   }
  //   this.datum.push(Data);
  //   return Data;
  // }

  // findAll() {
  //   return this.datum;
  // }

  // findOne(id: string) {
  //   return this.datum.find((data) => data.id === id);
  // }

  // update(id: number, updateDatumDto: UpdateDatumDto) {
  //   return `This action updates a #${id} datum`;
  // }

  // remove(id: string) {
  //   const data = this.findOne(id);
  //   if(!data){
  //     return false;
  //   }
  //   this.datum = this.datum.filter((data) => data.id !== id);
  //   return true;
  // }
}