import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { Check, Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { Offer } from '@/modules/offers/entities/offer.entity';
import { User } from '@/modules/users/entities/user.entity';

import { BaseEntity } from '@/common/entities/base-entity.entity';
import { IsPrice } from '@/common/utils/validation/is-price';

@Entity()
@Check('CHK_WISH_PRICE_POSITIVE', 'price >= 0')
@Check('CHK_WISH_RAISED_POSITIVE', 'raised >= 0 OR raised IS NULL')
@Check('CHK_WISH_COPIED_POSITIVE', 'copied >= 0')
@Check('CHK_WISH_NAME_LENGTH', 'LENGTH(name) >= 1 AND LENGTH(name) <= 250')
@Check('CHK_WISH_DESCRIPTION_LENGTH', 'LENGTH(description) >= 1 AND LENGTH(description) <= 1024')
@Check('CHK_WISH_LINK_URL', "link LIKE 'http%'")
@Check('CHK_WISH_IMAGE_URL', "image LIKE 'http%'")
export class Wish extends BaseEntity {
  @ApiProperty({
    description: 'Название подарка',
    type: String,
    example: 'Новый телефон',
  })
  @Column({
    length: 250,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 250)
  name: string;

  @ApiProperty({
    description: 'Ссылка на подарок',
    type: String,
    example: 'https://www.google.com',
  })
  @Column({
    nullable: false,
  })
  @IsUrl()
  link: string;

  @ApiProperty({
    description: 'Ссылка на изображение подарка',
    type: String,
    example: 'https://www.google.com',
  })
  @Column({
    nullable: false,
  })
  @IsUrl()
  image: string;

  @ApiProperty({
    description: 'Цена подарка',
    type: Number,
    example: 1000.15,
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
  })
  @IsNumber()
  @IsPrice()
  price: number;

  @ApiProperty({
    description: 'Сумма, на которую уже собрано средств',
    type: Number,
    example: 1000.15,
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  @IsNumber()
  @IsPrice()
  raised: number;

  @ApiProperty({
    description: 'Владелец подарка',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.wishes, {
    onDelete: 'CASCADE',
  })
  owner: User;

  @ApiProperty({
    description: 'Описание подарка',
    type: String,
    example: 'Новый телефон',
  })
  @Column({
    length: 1024,
    nullable: false,
  })
  @IsString()
  @Length(1, 1024)
  description: string;

  @OneToMany(() => Offer, (offer) => offer.item, {
    cascade: true,
  })
  offers: Offer[];

  @ApiProperty({
    description: 'Количество копий подарка',
    type: Number,
    example: 0,
  })
  @Column({
    type: 'integer',
    default: 0,
    nullable: false,
  })
  @IsOptional()
  copied: number;
}
