import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { Image } from 'src/images/image.entity';

interface projectDTO {
  id: number;
  title: string;
  description: string;
  link: string;
  images: Array<string>;
}

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  findAll(): Promise<Project[]> {
    return this.projectsRepository.find({ relations: ['images'] });
  }

  async findOne(id: number): Promise<Project> {
    return this.projectsRepository.findOne({
      where: { id },
      relations: ['images'],
    });
  }

  async create(project: projectDTO): Promise<Project> {
    const { images, ...restOfTheProject } = project;
    const savedImages = await Promise.all(
      images.map((image) => {
        const newImage = new Image();
        newImage.image_data = image;
        return this.imageRepository.save(newImage);
      }),
    );
    const projectToCreate: Project = {
      ...restOfTheProject,
      images: savedImages,
    };
    const newProject = this.projectsRepository.create(projectToCreate);
    return this.projectsRepository.save(newProject);
  }

  async update(id: number, project: Partial<Project>): Promise<Project> {
    await this.projectsRepository.update(id, project);
    return this.projectsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.projectsRepository.delete(id);
  }
}
