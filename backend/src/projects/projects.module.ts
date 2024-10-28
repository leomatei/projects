import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Image } from 'src/images/image.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { SeedDatabase } from './../seed';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Image])],
  controllers: [ProjectsController],
  providers: [ProjectsService, SeedDatabase],
  exports: [ProjectsService],
})
export class ProjectsModule {}
