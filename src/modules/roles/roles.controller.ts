import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { RenameRoleDto } from './dtos/rename.dto';
import { AddRoleDto } from './dtos/add.dto';
import { RolesService } from './roles.service';
import { Permission } from 'src/common/decorators/perrmision.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService){}
  @Get(":id")
  @Permission("roles:read", "roles:modify")
  getRole(@Param("id") id: number) {
    return this.rolesService.getRole(id);
  }

  @Get()
  @Permission("roles:read", "roles:modify")
  getRoles() {
    return this.rolesService.getRoles();
  }

  @Post()
  @HttpCode(201)
  @Permission("permission:modify")
  createRole(@Body() body: AddRoleDto) {
    return this.rolesService.createRole(body.name);
  }

  @Delete(":id")
  @HttpCode(204)
  @Permission("permission:modify")
  deleteRole(@Param("id") id: number) {
    return this.rolesService.deleteRole(id);
  }

  @Patch(":id")
  @HttpCode(204)
  @Permission("permission:modify")
  renameRole(@Param("id") id: number, @Body() body: RenameRoleDto) {
    return this.rolesService.renameRole(id, body.name);
  }

  @Post(":id/permissions/:permission_id")
  @HttpCode(204)
  @Permission("permission:modify")
  addPermission(@Param("id") id: number, @Param("permission_id") permission_id: number) {
    return this.rolesService.addPermission(id, permission_id);
  }

  @Delete(":id/permissions/:permission_id")
  @HttpCode(204)
  @Permission("permission:modify")
  deletePermission(@Param("id") id: number, @Param("permission_id") permission_id: number) {
    return this.rolesService.deletePermission(id, permission_id);
  }
}
