import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
  Query,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import { newProjectDTO } from './project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('seed')
  async seed() {
    const res = await this.projectsService.addSampleProjects();
    return { ...res, message: 'DB has rows completed now!' };
  }

  @Get()
  async getProjects(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('showAll') showAll: string = 'false',
  ): Promise<{ data: Project[]; total: number }> {
    const showAllBool = showAll === 'true';
    return this.projectsService.findAll(page, limit, showAllBool);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Project> {
    const project = await this.projectsService.findOne(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  @Post()
  async create(@Body() project: newProjectDTO): Promise<Project> {
    if (!project.title || !project.link) {
      throw new BadRequestException('Title and link are required');
    }
    return this.projectsService.create(project);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() project: Partial<Project>,
  ): Promise<Project> {
    const existingProject = await this.projectsService.findOne(id);
    if (!existingProject) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return this.projectsService.update(id, project);
  }

  @Patch(':id')
  async updateStatus(
    @Param('id') id: number,
    @Body('status') status: boolean,
  ): Promise<{ message: string }> {
    return await this.projectsService.updateStatus(id, status);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    const existingProject = await this.projectsService.findOne(id);
    if (!existingProject) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return await this.projectsService.remove(id);
  }
}
