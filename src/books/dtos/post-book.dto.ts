import { IsNumber, IsString } from "class-validator";

export class PostBookDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;
};