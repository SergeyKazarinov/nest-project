import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';

import { ERROR_MESSAGES } from '@/common/consts/error';
import { checkHasEntity } from '@/common/utils/service/check-has-entity';
import { TransactionService } from '@/common/utils/service/transaction';

import { User } from '../users/entities/user.entity';
import { GET_WISH_DTO_ORM_OPTIONS } from '../wishes/const/orm';
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

  private async getWishlistItems(itemsId: number[]) {
    return this.wishesRepository.find({
      ...GET_WISH_DTO_ORM_OPTIONS,
      where: { id: In(itemsId) },
    });
  }

  async create(user: User, createWishlistDto: CreateWishlistDto) {
    const wishlistItems = await this.getWishlistItems(createWishlistDto.itemsId);

    const wishlist = this.wishlistsRepository.create({
      ...createWishlistDto,
      items: wishlistItems,
      owner: user,
    });

    await this.wishlistsRepository.save(wishlist);

    const foundWishlist = await this.wishlistsRepository.findOne({
      where: { id: wishlist.id },
      relations: ['owner', 'items'],
    });

    return checkHasEntity(foundWishlist, 'WISHLIST');
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

  remove(id: number) {
    return `This action removes a #${id} wishlist`;
  }
}
