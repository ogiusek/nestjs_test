import { IsString } from "class-validator";

export class RenameRoleDto {
  @IsString()
  name: string;
}