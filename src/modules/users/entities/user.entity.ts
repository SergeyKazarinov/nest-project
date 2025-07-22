import { IsEmail, IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';

import { Offer } from '@/modules/offers/entities/offer.entity';
import { Wish } from '@/modules/wishes/entities/wish.entity';
import { Wishlist } from '@/modules/wishlists/entities/wishlist.entity';

import { BaseEntity } from '@/common/entities/baseEntity.entity';

@Entity()
export class User extends BaseEntity {
  @Column({
    length: 30,
    nullable: false,
  })
  @Length(2, 30)
  @IsNotEmpty()
  @IsString()
  username: string;

  @Column({
    length: 300,
    default: 'Пока ничего не рассказал о себе',
  })
  @Length(2, 1500)
  @IsString()
  about: string;

  @IsUrl()
  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  avatar: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Column({
    nullable: false,
  })
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.id)
  wishlists: Wishlist[];
}
