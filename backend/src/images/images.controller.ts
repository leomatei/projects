import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { newImageDTO } from './image.dto';
import { Image } from './image.entity';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Image> {
    const image = await this.imagesService.findOne(id);
    if (!image) {
      throw new NotFoundException({
        message: `Image with ID ${id} not found`,
        errorCode: 'IMAGE_NOT_FOUND',
      });
    }
    return image;
  }

  @Post()
  async create(@Body() image: newImageDTO): Promise<Image> {
    if (!image.image_data || typeof image.image_data !== 'string') {
      throw new NotFoundException({
        message: 'Invalid image data',
        errorCode: 'IMAGE_NOT_FOUND',
      });
    }
    return this.imagesService.create(image);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<newImageDTO>,
  ): Promise<Image> {
    const existingImage = await this.imagesService.findOne(id);
    if (!existingImage) {
      throw new NotFoundException({
        message: `Image with ID ${id} not found`,
        errorCode: 'IMAGE_NOT_FOUND',
      });
    }
    return this.imagesService.update(id, updateData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const result = await this.imagesService.delete(id);
    if (!result) {
      throw new NotFoundException({
        message: `Image with ID ${id} not found`,
        errorCode: 'IMAGE_NOT_FOUND',
      });
    }
  }
}
