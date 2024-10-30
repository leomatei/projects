import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { ImagesService } from 'src/images/images.service';
import { newProjectDTO } from './project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    private imageService: ImagesService,
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
        return this.imageService.create({
          image_data: image,
          project: newProject,
        });
      }),
    );
    return newProject;
  }

  async update(id: number, project: Partial<Project>): Promise<Project> {
    const { images, ...partialProject } = project;
    await this.projectsRepository.update(id, partialProject);
    const updatedProject = await this.projectsRepository.findOne({
      where: { id },
      relations: ['images'],
    });
    const initialImages = updatedProject.images;
    const imagesToDelete = initialImages.filter(
      (image) =>
        !images.filter((item) => item.image_data === image.image_data).length,
    );
    await Promise.all(
      imagesToDelete.map((item) => this.imageService.delete(item.id)),
    );
    const imagesToAdd = images.filter(
      (image) =>
        !initialImages.filter((item) => item.image_data === image.image_data)
          .length,
    );
    await Promise.all(
      imagesToAdd.map((item) => {
        return this.imageService.create({ ...item, project: updatedProject });
      }),
    );
    return updatedProject;
  }

  async remove(id: number): Promise<void> {
    await this.projectsRepository.delete(id);
  }
}
