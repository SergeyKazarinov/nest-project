import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/modules/auth/guard/jwt-guard';

import { ApiCreateOperation, ApiFindOperation, ApiUpdateOperation } from '@/common/decorators/swagger';
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
  @ApiBearerAuth()
  @ApiCreateOperation('Создание wishlist-а', GetWishlistDto)
  create(@Req() req: RequestWithUser, @Body() createWishlistDto: CreateWishlistDto): Promise<GetWishlistDto> {
    return this.wishlistsService.create(req.user, createWishlistDto);
  }

  @Get()
  @ApiFindOperation('Получение списка wishlist-ов', GetWishlistDto, true)
  findAll(): Promise<GetWishlistDto[]> {
    return this.wishlistsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiFindOperation('Получение wishlist-а', GetWishlistDto, true)
  findOne(@Param('id') id: string): Promise<GetWishlistDto> {
    return this.wishlistsService.findOne(checkId(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUpdateOperation('Обновление wishlist-а', GetWishlistDto)
  update(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ): Promise<GetWishlistDto> {
    return this.wishlistsService.update(req.user, checkId(id), updateWishlistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishlistsService.remove(+id);
  }
}
