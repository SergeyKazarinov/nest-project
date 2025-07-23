import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}

  async create(createWishDto: CreateWishDto) {
    await this.wishRepository.save(createWishDto);
    return {};
  }

  async findLast() {
    return await this.wishRepository.find({
      relations: ['owner', 'offers'],
      order: {
        createdAt: 'DESC',
      },
      take: 40,
    });
  }

  async findTop() {
    return await this.wishRepository.find({
      relations: ['owner', 'offers'],
      order: {
        copied: 'DESC',
      },
      take: 20,
    });
  }

  async findOne(id: number) {
    return await this.wishRepository.findOne({
      where: { id },
      relations: ['owner', 'offers'],
    });
  }

  async update(id: number, updateWishDto: UpdateWishDto) {
    await this.wishRepository.update(id, updateWishDto);
    return await this.wishRepository.findOne({
      where: { id },
      relations: ['owner', 'offers'],
    });
  }

  async remove(id: number) {
    const wish = await this.wishRepository.findOne({
      where: { id },
    });

    await this.wishRepository.delete(id);
    return wish;
  }

  async copy(id: number) {
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

    await this.create(newWish);
    await this.wishRepository.increment({ id }, 'copied', 1);

    return newWish;
  }
}
