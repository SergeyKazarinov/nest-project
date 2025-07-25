import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/modules/auth/guard/jwt-guard';

import {
  ApiCreateOperation,
  ApiDeleteOperation,
  ApiFindOperation,
  ApiUpdateOperation,
} from '@/common/decorators/swagger';
import { RequestWithUser } from '@/common/types/request.types';

import { CreateWishDto } from './dto/create-wish.dto';
import { GetWishDto } from './dto/get-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { WishesService } from './wishes.service';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreateOperation('Создание подарка', GetWishDto)
  create(@Req() req: RequestWithUser, @Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(req.user, createWishDto);
  }

  @Get('/last')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiFindOperation('Получение списка последних подарков', GetWishDto, true)
  findLast() {
    return this.wishesService.findLast();
  }

  @Get('/top')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiFindOperation('Получение списка популярных подарков', GetWishDto, true)
  findTop() {
    return this.wishesService.findTop();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiFindOperation('Получение подарка по id', GetWishDto)
  findOne(@Param('id') id: string) {
    return this.wishesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUpdateOperation('Обновление подарка', GetWishDto)
  update(@Req() req: RequestWithUser, @Param('id') id: string, @Body() updateWishDto: UpdateWishDto) {
    return this.wishesService.update(req.user, +id, updateWishDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiDeleteOperation('Удаление подарка')
  remove(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.wishesService.remove(req.user, +id);
  }

  @Post(':id/copy')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreateOperation('Копирование подарка', Wish)
  copy(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.wishesService.copy(req.user, +id);
  }
}
