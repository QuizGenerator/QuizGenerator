import { Injectable } from '@nestjs/common';
import { CreateDatumDto } from './dto/create-datum.dto';
import { Data } from './entities/data.entity';
import { UserService } from 'src/user/user.service';
import { QuizService } from 'src/quiz/quiz.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Data) private readonly dataRepository: Repository<Data>,
    private userService: UserService,
    private quizService: QuizService,
  ) {}

  async createData(createDatumDto: CreateDatumDto): Promise<Data> {
    try {
      const { inputText, difficulty, type, dataTitle, quizNum, quizzes, user } = createDatumDto;
      const uid = await this.userService.getUserById(user);
      if (uid === null) {
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
      });

      const createdData = await this.dataRepository.save(Data);

      for (const quiz of quizzes) {
        await this.quizService.createQuiz({
          quizText: quiz.quizText,
          quizAnswer: quiz.quizAnswer,
          data: createdData,
        });
      }
      return Data;
    } catch (error) {
      throw error;
    }
  }

  async getDataByUser(userid: number): Promise<Data[]> {
    try {
      const user = await this.userService.getUserById(userid);
      const found = user ? await this.dataRepository.find({ where: { user: { id: user.id } } }) : null;
      return found || [];
    } catch (error) {
      throw error;
    }
  }

  async getDataByCategory(userid: number, categoryid: number): Promise<Data[]> {
    try {
      const user = await this.userService.getUserById(userid);
      const found = user
        ? await this.dataRepository.find({
          where: {
            user: { id: user.id },
            category: { id: categoryid },
          },
        })
        : null;
      return found || [];
    } catch (error) {
      throw error;
    }
  }

  async deleteDataById(id: number): Promise<boolean> {
    try {
      const data = await this.dataRepository.find({ where: { id: id }, relations: { quizzes: true } });
      const result = await this.dataRepository.softRemove(data);

      if (result.length === 0) {
        return false;
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
}
