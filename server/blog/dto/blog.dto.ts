import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export default class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string = '';

  @IsString()
  @IsNotEmpty()
  content: string = '';

  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
