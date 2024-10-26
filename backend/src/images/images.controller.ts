import { Controller, Post, Body } from '@nestjs/common';
import { ImagesService } from './images.service';
import { Image } from './image.entity';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  create(@Body() image: Image) {
    return this.imagesService.create(image);
  }
}
