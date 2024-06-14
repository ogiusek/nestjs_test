import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { Permission } from 'src/common/decorators/perrmision.decorator';
import { AddPermissionDto } from './dtos/add.dto';
import { RenamePermissionDto } from './dtos/rename.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @Permission("permission:read")
  getPermissions() {
    return this.permissionsService.getPermissions();
  }

  @Post()
  @Permission("permission:modify")
  addPermission(@Body() body: AddPermissionDto) {
    return this.permissionsService.addPermission(body.name);
  }

  @Delete(":id")
  @Permission("permission:modify")
  @HttpCode(204)
  deletePermission(@Param("id") id: number) {
    this.permissionsService.deletePermission(id);
  }

  @Patch(":id")
  @Permission("permission:modify")
  @HttpCode(204)
  renamePermission(@Param("id") id: number, @Body() body: RenamePermissionDto) {
    return this.permissionsService.renamePermission(id, body.name);
  }
}
