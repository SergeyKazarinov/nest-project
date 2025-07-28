import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { checkHasEntity } from '@/common/utils/service/check-has-entity';

import { User } from '../users/entities/user.entity';
import { GET_WISH_DTO_ORM_OPTIONS } from '../wishes/const/orm';
import { Wish } from '../wishes/entities/wish.entity';

import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
    @InjectRepository(Wishlist)
    private readonly wishlistsRepository: Repository<Wishlist>,
  ) {}

  async create(user: User, createWishlistDto: CreateWishlistDto) {
    const wishlistItems = await this.wishesRepository.find({
      ...GET_WISH_DTO_ORM_OPTIONS,
      where: { id: In(createWishlistDto.itemsId) },
    });

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

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    console.log(updateWishlistDto);
    return `This action updates a #${id} wishlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} wishlist`;
  }
}
