import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private readonly repo: Repository<Role>){}

  async getRole(id: number){
    return await this.repo.createQueryBuilder("role")
      .leftJoinAndSelect("role.permissions", "permissions").where("role.id = :id", { id })
      .getOne();
  }

  async getRoles(){
    return await this.repo.find();
  }

  async createRole(name: string){
    await this.repo.insert({ name }).catch(() => { throw new ConflictException() });
  }

  async deleteRole(id: number){
    await this.repo.delete({ id });
  }

  async renameRole(id: number, name: string){
    await this.repo.update({ id }, { name });
  }

  async addPermission(id: number, permission_id: number){
    await this.repo.createQueryBuilder()
      .relation(Role, "permissions")
      .of(id)
      .add(permission_id)
      .catch(() => { throw new ConflictException() });
  }

  async deletePermission(id: number, permission_id: number){
    await this.repo.createQueryBuilder()
      .relation(Role, "permissions")
      .of(id)
      .remove(permission_id);
  }
}
