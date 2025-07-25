import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/modules/users/entities/user.entity';
import { Wish } from '@/modules/wishes/entities/wish.entity';

import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
  ) {}

  async create(user: User, createOfferDto: CreateOfferDto) {
    const wish = await this.wishesRepository.findOne({
      where: { id: createOfferDto.itemId },
    });

    if (!wish) {
      throw new NotFoundException(`Желание с ID ${createOfferDto.itemId} не найдено`);
    }

    const offer = this.offersRepository.create({
      amount: createOfferDto.amount,
      hidden: createOfferDto.hidden,
      item: wish,
      user,
    });
    const savedOffer = await this.offersRepository.save(offer);
    return this.offersRepository.findOne({
      where: { id: savedOffer.id },
      relations: ['user', 'item'],
    });
  }

  findAll() {
    return this.offersRepository.find({
      relations: ['user', 'item'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} offer`;
  }

  update(id: number, updateOfferDto: UpdateOfferDto) {
    console.log(updateOfferDto);
    return `This action updates a #${id} offer`;
  }

  remove(id: number) {
    return `This action removes a #${id} offer`;
  }
}
