import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 255, unique: true })
  name: string;
};