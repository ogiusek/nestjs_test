import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./roles/roles.entity";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn("uuid", { name: "uuid" })
  uuid: string;

  @Column('bool', { name: 'confirmed', default: false })
  confirmed: boolean;

  @Column('varchar', { name: 'email', length: 255, unique: true })
  email: string;

  @Column('varchar', { name: 'password', length: 64 })
  password: string;

  @Column('timestamp', { name: 'created_at', default: 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'user_uuid',
      referencedColumnName: 'uuid'
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id'
    }
  })
  roles: Role[];
};