import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './permissions.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {
  private async initialize(){
    const permissions_count = await this.repo.count();
    if(permissions_count !== 0) return;

    await this.repo.insert({ name: "*" });
  }

  constructor(@InjectRepository(Permission) private readonly repo: Repository<Permission>) {
    this.initialize();
  }
}
