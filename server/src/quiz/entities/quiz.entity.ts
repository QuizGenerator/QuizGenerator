import { Data } from 'src/data/entities/data.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Quiz')
export class Quiz {
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
