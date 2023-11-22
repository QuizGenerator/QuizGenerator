import { IsNumber } from 'class-validator';

export class ChangeCategoryDto {
  @IsNumber()
  DataID: number;
  @IsNumber()
  nextCID: number;
}
