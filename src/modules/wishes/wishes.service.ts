import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PUBLIC_USER_PROFILE_SELECT } from '@/modules/users/const/orm';
import { User } from '@/modules/users/entities/user.entity';

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

  async create(user: User, createWishDto: CreateWishDto) {
    const wish = this.wishRepository.create({
      ...createWishDto,
      owner: user,
    });

    await this.wishRepository.save(wish);

    return this.wishRepository.findOne({
      where: { id: wish.id },
      relations: WISH_RELATIONS,
    });
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

  async findOne(id: number) {
    return await this.wishRepository.findOne({
      where: { id },
      relations: WISH_RELATIONS,
    });
  }

  async update(id: number, updateWishDto: UpdateWishDto) {
    await this.wishRepository.update(id, updateWishDto);
    return await this.wishRepository.findOne({
      where: { id },
      relations: WISH_RELATIONS,
    });
  }

  async remove(id: number) {
    const wish = await this.wishRepository.findOne({
      where: { id },
    });

    await this.wishRepository.delete(id);
    return wish;
  }

  async copy(user: User, id: number) {
    const wish = await this.wishRepository.findOne({
      where: { id },
    });

    if (!wish) {
      throw new NotFoundException('Подарок не найден');
    }

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
