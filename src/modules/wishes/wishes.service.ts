import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PUBLIC_USER_PROFILE_SELECT } from '@/modules/users/const/orm';
import { User } from '@/modules/users/entities/user.entity';

import { checkForbidden } from '@/common/utils/service/check-forbidden';
import { checkHasEntity } from '@/common/utils/service/check-has-entity';

import { WISH_RELATIONS } from './const/orm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}

  async checkEditPermissions(user: User, id: Wish['id']) {
    const wishData = await this.findOne(id);

    const wish = checkHasEntity(wishData, 'WISH');

    return checkForbidden(user, wish, wish.owner.id);
  }

  async create(user: User, createWishDto: CreateWishDto) {
    const wish = this.wishRepository.create({
      ...createWishDto,
      owner: user,
    });

    await this.wishRepository.save(wish);

    return this.findOne(wish.id);
  }

  async findLast() {
    return await this.wishRepository.find({
      relations: WISH_RELATIONS,
      select: {
        owner: PUBLIC_USER_PROFILE_SELECT,
      },
      order: {
        createdAt: 'DESC',
      },
      take: 40,
      skip: 0,
    });
  }

  async findTop() {
    return await this.wishRepository.find({
      relations: WISH_RELATIONS,
      select: {
        owner: PUBLIC_USER_PROFILE_SELECT,
      },
      order: {
        copied: 'DESC',
      },
      take: 20,
      skip: 0,
    });
  }

  async findOne(id: Wish['id']) {
    return await this.wishRepository.findOne({
      where: { id },
      relations: WISH_RELATIONS,
    });
  }

  async update(user: User, id: Wish['id'], updateWishDto: UpdateWishDto) {
    await this.checkEditPermissions(user, id);

    await this.wishRepository.update(id, updateWishDto);
    return await this.wishRepository.findOne({
      where: { id },
      relations: WISH_RELATIONS,
    });
  }

  async remove(user: User, id: Wish['id']) {
    await this.checkEditPermissions(user, id);

    await this.wishRepository.delete(id);
    return;
  }

  async copy(user: User, id: Wish['id']) {
    const wishData = await this.wishRepository.findOne({
      where: { id },
    });

    const wish = checkHasEntity(wishData, 'WISH');

    const newWish = {
      ...wish,
      copied: 0,
      id: undefined,
    };

    await this.create(user, newWish);
    await this.wishRepository.increment({ id }, 'copied', 1);

    return newWish;
  }
}
