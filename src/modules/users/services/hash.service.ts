import * as bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";

@Injectable()
export class HashService{
  private readonly salt: string = process.env.HASH_SALT ?? "";
  private readonly depth: number = Number(process.env.HASH_DEPTH) ?? 3;

  async hash(password: string) {
    return await bcrypt.hash(this.salt + password, this.depth);
  }
  
  async compare(password: string, hash: string) {
    return await bcrypt.compare(this.salt + password, hash);
  }
};