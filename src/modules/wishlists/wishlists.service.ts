import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { ERROR_MESSAGES } from '@/common/consts/error';
import { checkHasEntity } from '@/common/utils/service/check-has-entity';
import { TransactionService } from '@/common/utils/service/transaction';

import { User } from '../users/entities/user.entity';
import { Wish } from '../wishes/entities/wish.entity';

import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { WishlistBuilder } from './utils/wishlist-builder';

@Injectable()
export class WishlistsService {
  private readonly transactionService: TransactionService;
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
    @InjectRepository(Wishlist)
    private readonly wishlistsRepository: Repository<Wishlist>,
  ) {
    this.transactionService = new TransactionService(this.dataSource);
  }

  private async checkWishlistOwner(user: User, id: number) {
    const foundWishlist = await this.wishlistsRepository.findOne({
      where: { id },
      relations: ['owner', 'items'],
    });

    const wishlist = checkHasEntity(foundWishlist, 'WISHLIST');

    if (wishlist.owner.id !== user.id) {
      throw new ForbiddenException(ERROR_MESSAGES.FORBIDDEN);
    }

    return wishlist;
  }

  async create(user: User, createWishlistDto: CreateWishlistDto) {
    return await this.transactionService.run(async (manager) => {
      const builder = new WishlistBuilder(manager);

      return await builder.createDirector(user, createWishlistDto);
    });
  }

  findAll() {
    return this.wishlistsRepository.find({
      relations: ['owner', 'items'],
    });
  }

  async findOne(id: number) {
    const foundWishlist = await this.wishlistsRepository.findOne({
      where: { id },
      relations: ['owner', 'items'],
    });

    return checkHasEntity(foundWishlist, 'WISHLIST');
  }

  async update(user: User, id: number, updateWishlistDto: UpdateWishlistDto) {
    const wishlist = await this.checkWishlistOwner(user, id);

    return await this.transactionService.run(async (manager) => {
      const builder = new WishlistBuilder(manager);

      return await builder.updateDirector(id, wishlist, updateWishlistDto);
    });
  }

  async remove(user: User, id: number) {
    await this.checkWishlistOwner(user, id);

    const removedResult = await this.wishlistsRepository.delete(id);

    if (removedResult.affected === 0) {
      throw new InternalServerErrorException(ERROR_MESSAGES.WISHLIST.REMOVE_FAILED);
    }

    return {};
  }
}
