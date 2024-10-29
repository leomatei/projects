import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Project } from 'src/projects/project.entity';
@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image_data: string;
  @ManyToOne(() => Project, (project) => project.images, {
    onDelete: 'CASCADE',
  })
  project: Project;
}
