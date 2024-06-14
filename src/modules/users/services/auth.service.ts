import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HashService } from "./hash.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService{
  constructor(
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ){}

  async getPermissions(uuid: string) {
    const user = await this.userRepo.findOne({ where: { uuid }, relations: ["roles", "roles.permissions"] });
    if (user === null) throw new NotFoundException("user not found");
    return user.roles.map((role) => role.permissions).flat().map(permission => permission.name);
  }

  async generateJWT(user: User) {
    return this.jwtService.sign({ uuid: user.uuid, perrmisions: await this.getPermissions(user.uuid) });
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (user === null) throw new UnauthorizedException("wrong credentials");
    if(user.confirmed === false) throw new UnauthorizedException("please confirm this email");
    if(!await this.hashService.compare(password, user.password)) throw new UnauthorizedException("wrong credentials");
    return { "token": await this.generateJWT(user) };
  }
};