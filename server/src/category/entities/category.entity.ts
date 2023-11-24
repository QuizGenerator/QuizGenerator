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
import { ReturnCategoryDto } from '../dto/return-category.dto';

@Entity()
export class Category {
  createDto() {
    const returnCategoryDto = new ReturnCategoryDto();
    returnCategoryDto.DataNum = this.dataNum;
    returnCategoryDto.CategoryId = this.id;
    returnCategoryDto.Department = this.department;

    return returnCategoryDto;
  }

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
