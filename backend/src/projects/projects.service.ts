import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { Image } from 'src/images/image.entity';
import { newProjectDTO } from './project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async findAll(): Promise<Project[]> {
    return await this.projectsRepository.find({ relations: ['images'] });
  }

  async findOne(id: number): Promise<Project> {
    return this.projectsRepository.findOne({
      where: { id },
      relations: ['images'],
    });
  }

  async create(project: newProjectDTO): Promise<Project> {
    const { images, ...restOfTheProject } = project;
    const newProject = await this.projectsRepository.save(restOfTheProject);
    await Promise.all(
      images.map((image) => {
        const newImage = new Image();
        newImage.image_data = image;
        newImage.project = newProject;
        return this.imageRepository.save(newImage);
      }),
    );
    return newProject;
  }

  async update(id: number, project: Partial<Project>): Promise<Project> {
    const { images, ...partialProject } = project;
    const updatedProject = await this.projectsRepository.save({
      id,
      ...partialProject,
    });
    await Promise.all(
      images.map((item) => {
        const newImage = new Image();
        newImage.image_data = item.image_data;
        newImage.project = updatedProject;
        return this.imageRepository.save({ ...item, project: updatedProject });
      }),
    );
    return this.projectsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.projectsRepository.delete(id);
  }
}
