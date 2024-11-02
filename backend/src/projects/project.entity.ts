import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from '../images/image.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ length: 255, nullable: true })
  link: string;

  @OneToMany(() => Image, (image) => image.project, { cascade: true })
  images: Image[];

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
