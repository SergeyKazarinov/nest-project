import { InternalServerErrorException } from '@nestjs/common';
import { EntityManager, In } from 'typeorm';

import { User } from '@/modules/users/entities/user.entity';
import { GET_WISH_DTO_ORM_OPTIONS } from '@/modules/wishes/const/orm';
import { Wish } from '@/modules/wishes/entities/wish.entity';

import { ERROR_MESSAGES } from '@/common/consts/error';
import { checkHasEntity } from '@/common/utils/service/check-has-entity';

import { UpdateWishlistDto } from '../dto/update-wishlist.dto';
import { Wishlist } from '../entities/wishlist.entity';

export class WishlistBuilder {
  private id: number;
  private wishlist: Wishlist;
  private items: Wish[];
  private updateFields: Partial<Wishlist> = {};
  private owner: User;

  constructor(private readonly manager: EntityManager) {}

  private async getItems(itemsId?: number[]): Promise<void> {
    this.items = this.wishlist.items;

    if (itemsId) {
      const newItems = await this.manager.find(Wish, {
        ...GET_WISH_DTO_ORM_OPTIONS,
        where: { id: In(itemsId) },
      });

      this.wishlist.items = newItems;
    }
  }

  async updateDirector(id: number, wishlist: Wishlist, updateWishlistDto: UpdateWishlistDto) {
    return await this.withId(id)
      .withWishlist(wishlist)
      .withName(updateWishlistDto.name)
      .withDescription(updateWishlistDto.description)
      .withImage(updateWishlistDto.image)
      .withItems(updateWishlistDto.itemsId)
      .update();
  }

  withId(id: number): this {
    this.id = id;
    return this;
  }

  withWishlist(wishlist: Wishlist): this {
    this.wishlist = wishlist;
    return this;
  }

  withName(name?: string): this {
    if (!name) return this;
    this.updateFields.name = name;
    return this;
  }

  withDescription(description?: string): this {
    if (!description) return this;
    this.updateFields.description = description;
    return this;
  }

  withImage(image?: string): this {
    if (!image) return this;
    this.updateFields.image = image;
    return this;
  }

  withOwner(owner: User): this {
    this.owner = owner;
    return this;
  }

  withItems(itemsId?: number[]): this {
    this.getItems(itemsId);
    return this;
  }

  async update() {
    this.wishlist.items = this.items;

    await this.manager.save(Wishlist, this.wishlist);

    if (Object.keys(this.updateFields).length > 0) {
      const updatedResult = await this.manager.update(Wishlist, this.id, this.updateFields);

      if (updatedResult.affected === 0) {
        throw new InternalServerErrorException(ERROR_MESSAGES.WISHLIST.UPDATE_FAILED);
      }
    }

    const newWishlist = await this.manager.findOne(Wishlist, {
      where: { id: this.id },
      relations: ['owner', 'items'],
    });

    return checkHasEntity(newWishlist, 'WISHLIST');
  }
}
