import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() body: { name: string; description: string }) {
    return this.itemsService.create(body);
  }

  @Post('batch')
  createBatch(
    @Body() body: { items: { name: string; description: string }[] },
  ) {
    return this.itemsService.createBatch(body.items);
  }

  @Get()
  findAll(@Query('q') q?: string) {
    return this.itemsService.findAll(q);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.itemsService.findById(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() body: Partial<{ name: string; description: string }>,
  ) {
    return this.itemsService.update(+id, body);
  }

  @Put(':id/archive')
  archive(@Param('id') id: number) {
    return this.itemsService.archive(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.itemsService.remove(+id);
  }
}
