import { HashService } from './hash.service';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly hashService: HashService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
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
    if(existing_user) return existing_user.confirmed ? "user already exists" : "please confirm this email";
    const user = this.userRepo.create({ email, password: await this.hashService.hash(password) });
    await this.userRepo.save(user);
    return "user created. confirmation email sent";
  }

  async confirm(uuid: string) {
    const user = await this.userRepo.findOne({ where: { uuid } });
    if(!user) throw new NotFoundException("outdated link");
    if(user.confirmed === true) return "user is already confimed";
    user.confirmed = true;
    await this.userRepo.save(user);
    return "successfully confirmed";
  }
};