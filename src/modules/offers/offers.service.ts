import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { User } from '@/modules/users/entities/user.entity';
import { Wish } from '@/modules/wishes/entities/wish.entity';

import { ERROR_MESSAGES } from '@/common/consts/error';
import { checkHasEntity } from '@/common/utils/service/check-has-entity';
import { TransactionService } from '@/common/utils/service/transaction';

import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  private readonly transactionService: TransactionService;
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
  ) {
    this.transactionService = new TransactionService(dataSource);
  }

  private async checkWish(user: User, createOfferDto: CreateOfferDto) {
    const foundWishData = await this.wishesRepository.findOne({
      where: { id: createOfferDto.itemId },
      relations: ['owner', 'offers'],
    });

    const foundWish = checkHasEntity(foundWishData, 'WISH');

    if (foundWish.owner.id === user.id) {
      throw new BadRequestException(ERROR_MESSAGES.OFFER.OFFER_FOR_OWN_WISH);
    }

    if (Number(foundWish.raised) >= Number(foundWish.price)) {
      throw new BadRequestException(ERROR_MESSAGES.OFFER.OFFER_FOR_WISH_WITH_RAISED);
    }

    if (Number(foundWish.raised) + Number(createOfferDto.amount) > Number(foundWish.price)) {
      throw new BadRequestException(ERROR_MESSAGES.OFFER.OFFER_FOR_WISH_WITH_RAISED_AND_MORE);
    }

    return foundWish;
  }

  async create(user: User, createOfferDto: CreateOfferDto) {
    const foundWish = await this.checkWish(user, createOfferDto);

    const offer = await this.transactionService.run<Offer>(async (manager) => {
      const newOffer = manager.create(Offer, {
        amount: Number(createOfferDto.amount),
        hidden: createOfferDto.hidden,
        item: foundWish,
        user,
      });

      const savedOffer = await manager.save(newOffer);

      await manager.update(Wish, foundWish.id, {
        raised: Number(foundWish.raised) + Number(createOfferDto.amount),
      });

      const foundOffer = await manager.findOne(Offer, {
        where: { id: savedOffer.id },
        relations: ['user', 'item'],
      });

      return checkHasEntity(foundOffer, 'OFFER');
    });

    return offer;
  }

  findAll() {
    return this.offersRepository.find({
      relations: ['user', 'item'],
    });
  }

  async findOne(id: number) {
    const offer = await this.offersRepository.findOne({
      where: { id },
      relations: ['user', 'item'],
    });

    return checkHasEntity(offer, 'OFFER');
  }
}
