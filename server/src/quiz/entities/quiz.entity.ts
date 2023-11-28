import { Data } from 'src/data/entities/data.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ReturnQuizDto } from '../dto/return-quiz.dto';

@Entity('Quiz')
export class Quiz {

  createDto() : ReturnQuizDto {
    const returnQuizDto = new ReturnQuizDto();
    returnQuizDto.quizID = this.id;
    returnQuizDto.quizAnswer = this.quizAnswer;
    returnQuizDto.quizText = this.quizText;
    return returnQuizDto;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'quiz_text' })
  quizText: string;

  @Column({ type: 'varchar', name: 'quiz_answer' })
  quizAnswer: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: false })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Data, (data) => data.quizzes)
  data: Data;
}
