import { HashService } from './hash.service';
import { Repository } from 'typeorm';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users.entity';
import { Role } from 'src/modules/roles/roles.entity';
import { ConfirmationMailService } from './confirmationMail.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly hashService: HashService,
    private readonly confirmationMailService: ConfirmationMailService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>
  ){}

  async cleanUpUsers() {
    const older_than = new Date(Date.now() - 1000 * 60 * 60 * 24);
    await this.userRepo.createQueryBuilder()
      .delete()
      .from(User)
      .where("confirmed = :confirmed", { confirmed: false })
      .andWhere("created_at < :older_than", { older_than })
      .execute();
  }

  async register(email: string, password: string) {
    const existing_user = await this.userRepo.findOne({ where: { email } });
    if(!existing_user){
      const user = this.userRepo.create({ email, password: await this.hashService.hash(password) });
      await this.userRepo.save(user).catch(() => { throw new ConflictException("user already exists"); });
      this.confirmationMailService.send(email, user.uuid);
      return "user created. confirmation email sent";
    }
    if (existing_user.confirmed)
      throw new ConflictException("user already exists");
    return "please confirm this email";
  }

  async registerResend(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if(!user) throw new NotFoundException("user not found");
    if(user.confirmed) throw new NotFoundException("user already confirmed");
    this.confirmationMailService.send(email, user.uuid);
    return "confirmation email sent";
  }

  async confirm(uuid: string) {
    const user = await this.userRepo.findOne({ where: { uuid } });
    if(!user) throw new NotFoundException("outdated link");
    if(user.confirmed === true) return "user is already confimed";
    user.confirmed = true;
    await this.userRepo.save(user);
    return "successfully confirmed";
  }

  async addRole(uuid: string, roleId: number) {
    const user = await this.userRepo.findOne({ where: { uuid } });
    if(!user) throw new NotFoundException("user not found");

    const role = await this.roleRepo.findOne({ where: { id: roleId } });
    if(!role) throw new NotFoundException("role not found");
    
    if(user.roles.includes(role)) return "user already has this role";
    user.roles = [...user.roles, role];
    await this.userRepo.save(user);
    return "successfully added role";
  }
}