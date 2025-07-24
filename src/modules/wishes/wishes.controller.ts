import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import {
  ApiCreateOperation,
  ApiDeleteOperation,
  ApiFindOperation,
  ApiUpdateOperation,
} from '@/common/decorators/swagger';

import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { WishesService } from './wishes.service';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreateOperation('Создание подарка', Wish)
  create(@Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(createWishDto);
  }

  @Get('/last')
  @ApiBearerAuth()
  @ApiFindOperation('Получение списка последних подарков', Wish)
  findLast() {
    return this.wishesService.findLast();
  }

  @Get('/top')
  @ApiBearerAuth()
  @ApiFindOperation('Получение списка популярных подарков', Wish)
  findTop() {
    return this.wishesService.findTop();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiFindOperation('Получение подарка по id', Wish)
  findOne(@Param('id') id: string) {
    return this.wishesService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiUpdateOperation('Обновление подарка', Wish)
  update(@Param('id') id: string, @Body() updateWishDto: UpdateWishDto) {
    return this.wishesService.update(+id, updateWishDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiDeleteOperation('Удаление подарка')
  remove(@Param('id') id: string) {
    return this.wishesService.remove(+id);
  }

  @Post(':id/copy')
  @ApiBearerAuth()
  @ApiCreateOperation('Копирование подарка', Wish)
  copy(@Param('id') id: string) {
    return this.wishesService.copy(+id);
  }
}
