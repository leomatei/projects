import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Image } from '../images/image.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  link: string;

  @OneToMany(() => Image, (image) => image.project, { cascade: true })
  images: Image[];
}
