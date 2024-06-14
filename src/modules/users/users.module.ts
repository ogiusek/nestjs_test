import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { RolesModule } from '../roles/roles.module';
import { User } from './users.entity';
import { HashService } from './services/hash.service';
import { AuthService } from './services/auth.service';
import { Role } from '../roles/roles.entity';
import { MailerConfigModule } from 'src/common/config/mailer/mailer.module';
import { ConfirmationMailService } from './services/confirmationMail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    RolesModule,
    MailerConfigModule
  ],
  controllers: [UsersController],
  providers: [HashService, UsersService, AuthService, ConfirmationMailService]
})
export class UsersModule {
  constructor(private readonly usersService: UsersService) {
    const day = 24 * 60 * 60 * 1000;
    this.usersService.cleanUpUsers()
    setInterval(() => this.usersService.cleanUpUsers(), day);
  }
}
