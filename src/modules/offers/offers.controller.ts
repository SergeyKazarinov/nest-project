import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/modules/auth/guard/jwt-guard';

import { ApiCreateOperation, ApiFindOperation } from '@/common/decorators/swagger';
import { RequestWithUser } from '@/common/types/request.types';

import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreateOperation('Создание предложения', Offer)
  create(@Req() req: RequestWithUser, @Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(req.user, createOfferDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiFindOperation('Получение списка предложений', Offer)
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(+id);
  }
}
