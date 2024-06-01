import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./permissions/permissions.entity";

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'roles_permissions',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id'
    }
  })
  permissions: Permission[]
}