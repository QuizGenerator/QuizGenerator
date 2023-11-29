import { Injectable } from '@nestjs/common';
import { CreateDatumDto } from './dto/create-datum.dto';
import { Data } from './entities/data.entity';
import { UserService } from 'src/user/user.service';
import { QuizService } from 'src/quiz/quiz.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { ReturnDataDto } from './dto/return-data.dto';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Data) private readonly dataRepository: Repository<Data>,
    private userService: UserService,
    private quizService: QuizService,
    private dataSource: DataSource,
  ) {}

  async createData(userId: number, createDatumDto: CreateDatumDto): Promise<Data> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { inputText, difficulty, type, dataTitle, quizNum, quizzes } = createDatumDto;
      const user: User = await this.userService.getUserById(userId);
      if (user === null) {
        return null;
      }

      const Data = await this.dataRepository.create({
        inputText: inputText,
        difficulty: difficulty,
        type: type,
        dataTitle: dataTitle,
        quizNum: quizNum,
        user: user,
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
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getDataByUser(userid: number): Promise<ReturnDataDto[]> {
    try {
      const user = await this.userService.getUserById(userid);
      const found = user
        ? await this.dataRepository.find({
            select: {
              id: true,
              dataTitle: true,
              quizNum: true,
              inputText: true,
              difficulty: true,
              type: true,
              createdAt: true,
              category: { id: true },
            },
            relations: { category: true },
            where: { user: { id: user.id } },
          })
        : null;
      const result: ReturnDataDto[] = found.map((data) => {
        return data.createDto();
      });
      return result;
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
