import { Category } from 'src/category/entities/category.entity';
import { Data } from 'src/data/entities/data.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  static async createFrom(account: string, password: string, name: string): Promise<User> {
    const user: User = new User();
    user.account = account;

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    user.name = name;
    return user;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  account: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  name: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: false })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Category, (category) => category.user, { nullable: true })
  categories: Category[] | null;

  @OneToMany(() => Data, (data) => data.user, { nullable: true })
  datas: Data[] | null;
}
