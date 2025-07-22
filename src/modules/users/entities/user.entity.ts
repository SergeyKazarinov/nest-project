import { Column, Entity, OneToMany } from 'typeorm';

import { Offer } from '@/modules/offers';
import { Wish } from '@/modules/wishes';
import { Wishlist } from '@/modules/wishlists';

import { BaseEntity } from '@/common/entities/baseEntity.entity';

@Entity()
export class User extends BaseEntity {
  @Column({
    length: 30,
    nullable: false,
  })
  username: string;

  @Column({
    length: 300,
    default: 'Пока ничего не рассказал о себе',
  })
  about: string;

  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  avatar: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.id)
  offers: Offer[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];
}
