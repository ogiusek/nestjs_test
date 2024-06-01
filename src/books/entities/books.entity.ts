import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'description' })
  description: string;

  @Column('decimal', { name: 'price', precision: 10, scale: 2, default: 0.00 })
  price: number;
};