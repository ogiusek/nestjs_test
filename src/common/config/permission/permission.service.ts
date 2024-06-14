import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "src/modules/permissions/permissions.entity";
import { In, Repository } from "typeorm";

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission) private readonly repo: Repository<Permission>
  ){}

  async ensurePermissionExist(...permissions: string[]){
    const permission = await this.repo.find({ where: { name: In(permissions) } });
    const names = permission.map(p => p.name);
    const missing = permissions.filter(p => !names.includes(p));
    for (const name of missing)
      await this.repo.insert({ name });
    // if(permission) return;
    // await this.repo.insert({ name: permissions });
  }
}