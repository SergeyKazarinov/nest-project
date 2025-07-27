import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/modules/auth/guard/jwt-guard';

import { ApiCreateOperation, ApiFindOperation } from '@/common/decorators/swagger';
import { RequestWithUser } from '@/common/types/request.types';

import { CreateOfferDto } from './dto/create-offer.dto';
import { GetOfferDto } from './dto/get-offer.dto';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreateOperation('Создание заявки', GetOfferDto)
  create(@Req() req: RequestWithUser, @Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(req.user, createOfferDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiFindOperation('Получение списка предложений', GetOfferDto, true)
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiFindOperation('Получение предложения', GetOfferDto)
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(+id);
  }
}
