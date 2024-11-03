import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './image.entity';
import { newImageDTO } from './image.dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) {}

  findAll(): Promise<Image[]> {
    return this.imagesRepository.find();
  }

  findOne(id: number): Promise<Image | null> {
    return this.imagesRepository.findOne({ where: { id } });
  }

  create(image: newImageDTO): Promise<Image> {
    return this.imagesRepository.save(image);
  }

  async update(
    id: number,
    updateData: Partial<newImageDTO>,
  ): Promise<Image | null> {
    await this.imagesRepository.update(id, updateData);
    return this.findOne(id); // return the updated image
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.imagesRepository.delete(id);
    return !!result.affected;
  }
}
