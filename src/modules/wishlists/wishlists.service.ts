import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { checkForbidden } from '@/common/utils/service/check-forbidden';
import { checkHasEntity } from '@/common/utils/service/check-has-entity';
import { removeEntity } from '@/common/utils/service/remove-entity';
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
    const foundWishlist = await this.findOne(id);

    checkForbidden(user, foundWishlist, foundWishlist.owner.id);

    return foundWishlist;
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

    await removeEntity<Wishlist>(this.wishlistsRepository, id, 'WISHLIST');
    return {};
  }
}
