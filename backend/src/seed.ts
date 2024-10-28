import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Project } from './projects/project.entity';

@Injectable()
export class SeedDatabase {
  constructor(private dataSource: DataSource) {}

  async run() {
    const projectRepository = this.dataSource.getRepository(Project);

    const existingProjects = await projectRepository.find();

    if (existingProjects.length === 0) {
      const projects = [
        {
          title: 'Proiect 1',
          description: 'Descriere pentru proiectul 1.',
          link: 'http://example.com/project1',
        },
        {
          title: 'Proiect 2',
          description: 'Descriere pentru proiectul 2.',
          link: 'http://example.com/project2',
        },
        {
          title: 'Proiect 3',
          description: 'Descriere pentru proiectul 3.',
          link: 'http://example.com/project3',
        },
      ];

      for (const project of projects) {
        await projectRepository.save(project);
      }

      console.log('Seed db succesful!');
    } else {
      console.log('Seed db Error!');
    }
  }
}
