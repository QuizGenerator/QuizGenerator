import { Category } from 'src/category/entities/category.entity';
import { Data } from 'src/data/entities/data.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'user_id' })
  userId: string;

  @Column({ type: 'varchar' })
  name: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: false })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Category, (category) => category.user, { nullable: true })
  categorys: Category[];

  @OneToMany(() => Data, (data) => data.user, { nullable: true })
  datas: Data[];
}
