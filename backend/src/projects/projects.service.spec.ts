import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';
import { ImagesService } from '../images/images.service';
import { newProjectDTO } from './project.dto';

const mockProject: Project = {
  id: 1,
  title: 'Test Project',
  description: 'Test Description',
  link: 'http://example.com',
  images: [],
  status: true,
  created_at: new Date(),
  updated_at: new Date(),
};

const mockImageService = {
  create: jest.fn().mockResolvedValue({}),
  delete: jest.fn().mockResolvedValue(true),
};

describe('ProjectsService', () => {
  let service: ProjectsService;
  let repository: Repository<Project>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getRepositoryToken(Project),
          useValue: {
            findAndCount: jest.fn().mockResolvedValue([[mockProject], 1]),
            findOne: jest.fn().mockResolvedValue(mockProject),
            save: jest.fn().mockResolvedValue(mockProject),
            update: jest.fn().mockResolvedValue({ affected: 1 }),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
        {
          provide: ImagesService,
          useValue: mockImageService,
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    repository = module.get<Repository<Project>>(getRepositoryToken(Project));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all projects', async () => {
    const result = await service.findAll();
    expect(result).toEqual({ data: [mockProject], total: 1 });
  });

  it('should find one project', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(mockProject);
  });

  it('should create a new project', async () => {
    const projectData: newProjectDTO = {
      title: 'New Project',
      description: 'New Description',
      link: 'http://newlink.com',
      images: [],
    };

    const result = await service.create(projectData);
    expect(result).toEqual(mockProject);
    expect(mockImageService.create).not.toHaveBeenCalled();
  });

  it('should update a project', async () => {
    const result = await service.update(1, { title: 'Updated Title' });
    expect(result).toEqual(mockProject);
  });

  it('should update status of a project', async () => {
    const result = await service.updateStatus(1, false);
    expect(result).toEqual({ message: 'Updated' });
  });

  it('should remove a project', async () => {
    await service.remove(1);
    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});
