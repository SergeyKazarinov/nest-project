import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';

import { Offer } from '@/modules/offers/entities/offer.entity';
import { Wish } from '@/modules/wishes/entities/wish.entity';
import { Wishlist } from '@/modules/wishlists/entities/wishlist.entity';

import { BaseEntity } from '@/common/entities/base-entity.entity';

@Entity()
export class User extends BaseEntity {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'John Doe',
    minLength: 2,
    maxLength: 30,
  })
  @Column({
    length: 30,
    nullable: false,
  })
  @Length(2, 30)
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Описание пользователя',
    example: 'Пока ничего не рассказал о себе',
    minLength: 2,
    maxLength: 1500,
  })
  @Column({
    length: 300,
    default: 'Пока ничего не рассказал о себе',
  })
  @Length(2, 1500)
  @IsString()
  about: string;

  @ApiProperty({
    description: 'Аватар пользователя',
    example: 'https://i.pravatar.cc/300',
  })
  @IsUrl()
  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  avatar: string;

  @ApiProperty({
    description: 'Email пользователя',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  @Column({
    nullable: false,
    select: false,
  })
  password: string;

  @ApiProperty({
    description: 'Список желаний пользователя',
    type: Wish,
    isArray: true,
  })
  @OneToMany(() => Wish, (wish) => wish.owner, {
    cascade: true,
  })
  wishes: Wish[];

  @ApiProperty({
    description: 'Список предложений пользователя',
    type: Offer,
    isArray: true,
  })
  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @ApiProperty({
    description: 'Список списков желаний пользователя',
    type: Wishlist,
    isArray: true,
  })
  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];
}
