import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('roles')
export class RolesController {
  @Get()
  getRoles() {
    return "roles";
  }

  @Post()
  createRole() {
    return "create role";
  }

  @Delete()
  deleteRole() {
    return "delete role";
  }

  @Patch(":id")
  renameRole(@Param("id") id: number) {
    return "update role";
  }

  @Post(":id/permissions")
  addPermissions(@Param("id") id: number) {
    return "add permissions";
  }

  @Delete(":id/permissions/:permission_id")
  deletePermission(@Param("id") id: number, @Param("permission_id") permission_id: number) {
    return "delete permission";
  }
}
