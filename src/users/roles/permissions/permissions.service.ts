import { ConflictException, Global, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Permission } from './permissions.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Global()
@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission) private readonly repo: Repository<Permission>
  ){}

  async ensurePermissionExist(permissions: string){
    const permission = await this.repo.findOne({ where: { name: permissions } });
    if(permission) return;
    await this.repo.insert({ name: permissions });
  }

  async getPermissions() {
    return this.repo.find({ order: { id: "ASC" } });
  }

  async addPermission(permissionName: string) {
    const permission = new Permission();
    permission.name = permissionName;
    return this.repo.save(permission).catch(() => { throw new ConflictException() });
  }

  async deletePermission(id: number) {
    return this.repo.delete({ id });
  }

  async renamePermission(id: number, new_name: string) {
    const permission = await this.repo.findOne({ where: { id } });
    if(!permission) throw new NotFoundException("permission not found");
    permission.name = new_name;
    return this.repo.save(permission);
  }
}
