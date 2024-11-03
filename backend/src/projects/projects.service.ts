import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { ImagesService } from '../images/images.service';
import { newProjectDTO } from './project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    private imageService: ImagesService,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
    showAll: boolean = false,
  ): Promise<{ data: Project[]; total: number }> {
    const [projects, total] = await this.projectsRepository.findAndCount({
      relations: ['images'],
      skip: (page - 1) * limit,
      take: limit,
      order: {
        updated_at: 'DESC',
      },
      where: showAll ? {} : { status: true },
    });
    return { data: projects, total };
  }

  async findOne(id: number): Promise<Project> {
    return this.projectsRepository.findOne({
      where: { id },
      relations: ['images'],
    });
  }

  async create(project: newProjectDTO): Promise<Project> {
    const { images = [], ...restOfTheProject } = project;
    const newProject = await this.projectsRepository.save(restOfTheProject);
    await Promise.all(
      images.map((image) => {
        return this.imageService.create({
          image_data: image.image_data,
          project: newProject,
        });
      }),
    );
    return newProject;
  }

  async update(id: number, project: Partial<Project>): Promise<Project> {
    const { images = [], ...partialProject } = project;
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

  async updateStatus(
    id: number,
    status: boolean,
  ): Promise<{ message: string }> {
    const result = await this.projectsRepository.update(id, { status });
    if (result.affected === 0) {
      throw new Error(`Project with ID ${id} not found`);
    }
    return { message: 'Updated' };
  }

  async remove(id: number): Promise<void> {
    await this.projectsRepository.delete(id);
  }

  async addSampleProjects(): Promise<{ projects: Project[]; total: number }> {
    const sampleProjects = Array.from({ length: 10 }, (_, index) => ({
      title: `Sample Project ${index + 1}`,
      description: `This is the description for sample project ${index + 1}.`,
      link: `http://example.com/sample_project_${index + 1}`,
    }));

    const projectsSaved = await Promise.all(
      sampleProjects.map((projectData) =>
        this.projectsRepository.save(projectData),
      ),
    );
    const total = await this.projectsRepository.count();
    return {
      projects: projectsSaved.map((item) => ({ ...item, images: [] })),
      total,
    };
  }
}
