import { IsNotEmpty, IsNumber, IsString, IsUrl, Length } from 'class-validator';
import { Column, ManyToOne } from 'typeorm';

import { Offer } from '@/modules/offers';
import { User } from '@/modules/users';

import { BaseEntity } from '@/common/entities/baseEntity.entity';

export class Wish extends BaseEntity {
  @Column({
    length: 250,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 250)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column({
    type: 'money',
  })
  @IsNumber()
  price: number;

  @Column({
    type: 'money',
  })
  @IsNumber()
  raised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @Column({
    length: 1024,
  })
  @IsString()
  @Length(1, 1024)
  description: string;

  @ManyToOne(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @Column()
  copied: number;
}
