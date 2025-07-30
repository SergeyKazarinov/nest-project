import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/modules/auth/guard/jwt-guard';

import { ApiSwaggerOperation } from '@/common/decorators/swagger';
import { RequestWithUser } from '@/common/types/request.types';
import { checkId } from '@/common/utils/service/check-id';

import { CreateWishDto } from './dto/create-wish.dto';
import { GetWishDto } from './dto/get-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { WishesService } from './wishes.service';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerOperation({
    summary: 'Создание подарка',
    responseType: GetWishDto,
    createdDescription: 'Подарок успешно создан',
    isAuth: true,
  })
  create(@Req() req: RequestWithUser, @Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(req.user, createWishDto);
  }

  @Get('/last')
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerOperation({
    summary: 'Получение списка последних подарков',
    responseType: GetWishDto,
    isArray: true,
    isAuth: true,
  })
  findLast() {
    return this.wishesService.findLast();
  }

  @Get('/top')
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerOperation({
    summary: 'Получение списка популярных подарков',
    responseType: GetWishDto,
    isArray: true,
    isAuth: true,
  })
  findTop() {
    return this.wishesService.findTop();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerOperation({
    summary: 'Получение подарка по id',
    responseType: GetWishDto,
    isAuth: true,
    notFoundErrorMessage: 'WISH',
  })
  findOne(@Param('id') id: string) {
    return this.wishesService.findOne(checkId(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerOperation({
    summary: 'Обновление подарка',
    responseType: GetWishDto,
    isAuth: true,
    notFoundErrorMessage: 'WISH',
    updatedDescription: 'Подарок успешно обновлен',
  })
  update(@Req() req: RequestWithUser, @Param('id') id: string, @Body() updateWishDto: UpdateWishDto) {
    return this.wishesService.update(req.user, checkId(id), updateWishDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerOperation({
    summary: 'Удаление подарка',
    responseType: undefined,
    notFoundErrorMessage: 'WISH',
    deletedDescription: 'Подарок успешно удален',
  })
  remove(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.wishesService.remove(req.user, checkId(id));
  }

  @Post(':id/copy')
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerOperation({
    summary: 'Копирование подарка',
    responseType: GetWishDto,
    createdDescription: 'Подарок успешно скопирован',
    isAuth: true,
  })
  copy(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.wishesService.copy(req.user, checkId(id));
  }
}
