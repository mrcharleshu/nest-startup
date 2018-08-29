import { IsInt, IsString } from 'class-validator';

export class CreateCatDto {
  @IsString({ message: '名称不能为空' }) readonly name: string;
  @IsInt({ message: '年龄不能为空' }) readonly age: number;
  @IsString() readonly breed: string;
}