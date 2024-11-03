import { Test, TestingModule } from '@nestjs/testing';
import { ImagesService } from './images.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { Repository } from 'typeorm';

describe('ImagesService', () => {
  let service: ImagesService;
  let repository: Repository<Image>;

  const mockImage = { id: 1, image_data: 'image_data_base64', project: null };
  const mockRepository = {
    find: jest.fn().mockResolvedValue([mockImage]),
    findOne: jest.fn().mockResolvedValue(mockImage),
    save: jest.fn().mockResolvedValue(mockImage),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImagesService,
        { provide: getRepositoryToken(Image), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<ImagesService>(ImagesService);
    repository = module.get<Repository<Image>>(getRepositoryToken(Image));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all images', async () => {
    const images = await service.findAll();
    expect(images).toEqual([mockImage]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should find one image by id', async () => {
    const image = await service.findOne(1);
    expect(image).toEqual(mockImage);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should create an image', async () => {
    const newImage = { image_data: 'new_image_data_base64', project: null };
    const result = await service.create(newImage);
    expect(result).toEqual(mockImage);
    expect(repository.save).toHaveBeenCalledWith(newImage);
  });

  it('should update an image', async () => {
    const updateData = { image_data: 'updated_image_data' };
    const updatedImage = await service.update(1, updateData);
    expect(updatedImage).toEqual(mockImage);
    expect(repository.update).toHaveBeenCalledWith(1, updateData);
  });

  it('should delete an image', async () => {
    const result = await service.delete(1);
    expect(result).toEqual(true);
    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});
