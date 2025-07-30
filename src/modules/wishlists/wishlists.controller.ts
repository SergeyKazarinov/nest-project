import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/modules/auth/guard/jwt-guard';

import { ApiSwaggerOperation } from '@/common/decorators/swagger';
import { RequestWithUser } from '@/common/types/request.types';
import { checkId } from '@/common/utils/service/check-id';

import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { GetWishlistDto } from './dto/get-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { WishlistsService } from './wishlists.service';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerOperation({
    summary: 'Создание wishlist-а',
    responseType: GetWishlistDto,
    createdDescription: 'Wishlist успешно создан',
    isAuth: true,
  })
  create(@Req() req: RequestWithUser, @Body() createWishlistDto: CreateWishlistDto): Promise<GetWishlistDto> {
    return this.wishlistsService.create(req.user, createWishlistDto);
  }

  @Get()
  @ApiSwaggerOperation({
    summary: 'Получение списка wishlist-ов',
    responseType: GetWishlistDto,
    isArray: true,
  })
  findAll(): Promise<GetWishlistDto[]> {
    return this.wishlistsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerOperation({
    summary: 'Получение wishlist-а',
    responseType: GetWishlistDto,
    isAuth: true,
    isArray: true,
    notFoundErrorMessage: 'WISHLIST',
  })
  findOne(@Param('id') id: string): Promise<GetWishlistDto> {
    return this.wishlistsService.findOne(checkId(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerOperation({
    summary: 'Обновление wishlist-а',
    responseType: GetWishlistDto,
    isAuth: true,
    updatedDescription: 'Wishlist успешно обновлен',
    notFoundErrorMessage: 'WISHLIST',
  })
  update(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ): Promise<GetWishlistDto> {
    return this.wishlistsService.update(req.user, checkId(id), updateWishlistDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerOperation({
    summary: 'Удаление wishlist-а',
    responseType: undefined,
    isAuth: true,
    deletedDescription: 'Wishlist успешно удален',
    notFoundErrorMessage: 'WISHLIST',
  })
  remove(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.wishlistsService.remove(req.user, checkId(id));
  }
}
