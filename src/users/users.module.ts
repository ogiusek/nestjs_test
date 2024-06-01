import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { RolesModule } from './roles/roles.module';
import { User } from './users.entity';
import { HashService } from './services/hash.service';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RolesModule,
  ],
  controllers: [UsersController],
  providers: [HashService, UsersService, AuthService]
})
export class UsersModule {
  constructor(private readonly usersService: UsersService) {
    const day = 24 * 60 * 60 * 1000;
    this.usersService.cleanUpUsers()
    setInterval(() => this.usersService.cleanUpUsers(), day);
  }
}
