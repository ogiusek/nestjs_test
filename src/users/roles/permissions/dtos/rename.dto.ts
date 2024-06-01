import { IsString } from "class-validator";

export class RenamePermissionDto{
  @IsString()
  name: string;
};