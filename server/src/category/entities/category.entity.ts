import { User } from 'src/user/entities/user.entity';
import { Data } from 'src/data/entities/data.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  department: string;

  @Column({ name: 'data_num', default: 0 })
  dataNum: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: false })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => User, (user) => user.categories)
  user: User;

  @OneToMany(() => Data, (data) => data.category, { nullable: true, cascade: ['soft-remove'] })
  datas: Data[];
}
