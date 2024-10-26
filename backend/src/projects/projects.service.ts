import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
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

  create(project: Project): Promise<Project> {
    return this.projectsRepository.save(project);
  }

  async update(id: number, project: Partial<Project>): Promise<Project> {
    await this.projectsRepository.update(id, project);
    return this.projectsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.projectsRepository.delete(id);
  }
}
