import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import { newProjectDTO } from './project.dto';
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('seed')
  async seed() {
    await this.projectsService.addSampleProjects();
    return { message: 'DB has rows completed now!' };
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.projectsService.findOne(id);
  }

  @Post()
  create(@Body() project: newProjectDTO) {
    return this.projectsService.create(project);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() project: Partial<Project>) {
    return this.projectsService.update(id, project);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.projectsService.remove(id);
  }
}
