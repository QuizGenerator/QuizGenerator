import { User } from 'src/user/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReturnDataDto } from '../dto/return-data.dto';

@Entity('Data')
export class Data {
  createDto(): ReturnDataDto {
    const returnDataDto = new ReturnDataDto();
    returnDataDto.dataId = this.id;
    returnDataDto.DataTitle = this.dataTitle;
    returnDataDto.Difficulty = this.difficulty;
    returnDataDto.QuizNum = this.quizNum;
    returnDataDto.Type = this.type;

    const koreaTime = new Date(this.createdAt.getTime() + 9 * 60 * 60 * 1000);
    returnDataDto.created_at = koreaTime;

    returnDataDto.inputText = this.inputText;
    returnDataDto.CategoryId = this.category ? this.category.id : null;

    return returnDataDto;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'data_title' })
  dataTitle: string;

  @Column({ name: 'quiz_num' })
  quizNum: number;

  @Column({ type: 'varchar', name: 'input_text' })
  inputText: string;

  @Column()
  difficulty: string;

  @Column({ type: 'varchar' })
  type: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: false })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Quiz, (quiz) => quiz.data, { cascade: ['soft-remove'] })
  quizzes: Quiz[];

  @ManyToOne(() => User, (user) => user.datas, { cascade: true })
  user: User;

  @ManyToOne(() => Category, (category) => category.datas, { nullable: true })
  category?: Category;
}
