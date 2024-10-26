import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) {}

  findAll(): Promise<Image[]> {
    return this.imagesRepository.find();
  }

  create(image: Image): Promise<Image> {
    return this.imagesRepository.save(image);
  }
}
