import { IsInt, IsNumber, IsString } from "class-validator";

export class AddRoleDto {
  @IsNumber()
  roleId: number;
}
