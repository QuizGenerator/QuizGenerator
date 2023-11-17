import { User } from 'src/auth/entities/user.entity';
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

@Entity('Data')
export class Data {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'data_title' })
  dataTitle: string;

  @Column({ name: 'quiz_num' })
  quizNum: number;

  @Column({ type: 'varchar', name: 'input_text' })
  inputText: string;

  @Column()
  difficulty: number;

  @Column({ type: 'varchar' })
  type: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: false })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Quiz, (quiz) => quiz.data)
  quizzes: Quiz[];

  @ManyToOne(() => User, (user) => user.datas)
  user: User;

  @ManyToOne(() => Category, (category) => category.datas)
  category: Category;
}
