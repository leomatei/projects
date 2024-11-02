import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
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
