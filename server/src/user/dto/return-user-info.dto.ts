import { User } from '../entities/user.entity';
import { ReturnUserCategoryInfoDto } from './return-user-category.dto';

export class ReturnUserInfoDto {
  static createFrom(user: User) {
    const returnUserInfoDto: ReturnUserInfoDto = new ReturnUserInfoDto();
    returnUserInfoDto.id = user.id;
    returnUserInfoDto.account = user.account;
    returnUserInfoDto.categoryInfo = user.categories.map((category) => {
      return ReturnUserCategoryInfoDto.createFrom(category);
    });
  }
  id: number;
  account: string;
  categoryInfo: ReturnUserCategoryInfoDto[];
}
