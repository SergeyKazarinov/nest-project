import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { User } from '@/modules/users/entities/user.entity';

import { checkForbidden } from '@/common/utils/service/check-forbidden';
import { checkHasEntity } from '@/common/utils/service/check-has-entity';
import { TransactionService } from '@/common/utils/service/transaction';

import { GET_WISH_DTO_ORM_OPTIONS } from './const/orm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';

@Injectable()
export class WishesService {
  private readonly transactionService: TransactionService;

  constructor(
    private dataSource: DataSource,
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {
    this.transactionService = new TransactionService(dataSource);
  }

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
      ...GET_WISH_DTO_ORM_OPTIONS,
      order: {
        createdAt: 'DESC',
      },
      take: 40,
      skip: 0,
    });
  }

  async findTop() {
    return await this.wishRepository.find({
      ...GET_WISH_DTO_ORM_OPTIONS,
      order: {
        copied: 'DESC',
      },
      take: 20,
      skip: 0,
    });
  }

  async findOne(id: Wish['id']) {
    const wish = await this.wishRepository.findOne({
      where: { id },
      ...GET_WISH_DTO_ORM_OPTIONS,
    });

    return checkHasEntity(wish, 'WISH');
  }

  async update(user: User, id: Wish['id'], updateWishDto: UpdateWishDto) {
    await this.checkEditPermissions(user, id);

    await this.wishRepository.update(id, updateWishDto);
    return await this.wishRepository.findOne({
      where: { id },
      ...GET_WISH_DTO_ORM_OPTIONS,
    });
  }

  async remove(user: User, id: Wish['id']) {
    await this.checkEditPermissions(user, id);

    await this.wishRepository.delete(id);
    return;
  }

  async copy(user: User, id: Wish['id']) {
    const result = await this.transactionService.run<Wish>(async (manager) => {
      const wishData = await manager.findOne(Wish, {
        where: { id },
      });

      const wish = checkHasEntity(wishData, 'WISH');

      const newWish: Wish = {
        ...wish,
        id: 0,
        copied: 0,
        owner: user,
      };

      const createdWish = manager.create(Wish, newWish);

      await manager.save(createdWish);
      await manager.increment(Wish, { id }, 'copied', 1);

      const foundWish = await manager.findOne(Wish, {
        where: { id: createdWish.id },
        ...GET_WISH_DTO_ORM_OPTIONS,
      });

      return checkHasEntity(foundWish, 'WISH');
    });

    return result;
  }
}
