import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Image } from '../images/image.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ length: 255, nullable: true })
  link: string;

  @OneToMany(() => Image, (image) => image.project, { cascade: true })
  images: Image[];
}
