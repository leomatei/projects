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

  create(image: newImageDTO): Promise<Image> {
    return this.imagesRepository.save(image);
  }
  async delete(id: number): Promise<Boolean> {
    return await this.imagesRepository.delete(id).then((res) => !!res.affected);
  }
}
