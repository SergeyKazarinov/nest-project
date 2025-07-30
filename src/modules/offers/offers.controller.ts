import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/modules/auth/guard/jwt-guard';

import { ApiSwaggerOperation } from '@/common/decorators/swagger';
import { RequestWithUser } from '@/common/types/request.types';
import { checkId } from '@/common/utils/service/check-id';

import { CreateOfferDto } from './dto/create-offer.dto';
import { GetOfferDto } from './dto/get-offer.dto';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerOperation({
    summary: 'Создание заявки',
    responseType: GetOfferDto,
    createdDescription: 'Заявка успешно создана',
    isAuth: true,
  })
  create(@Req() req: RequestWithUser, @Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(req.user, createOfferDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerOperation({
    summary: 'Получение списка заявок',
    responseType: GetOfferDto,
    isArray: true,
    isAuth: true,
  })
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerOperation({
    summary: 'Получение заявки',
    responseType: GetOfferDto,
    isAuth: true,
    notFoundErrorMessage: 'OFFER',
  })
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(checkId(id));
  }
}
