import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';

import { Offer } from '@/modules/offers/entities/offer.entity';
import { User } from '@/modules/users/entities/user.entity';

import { BaseEntity } from '@/common/entities/baseEntity.entity';
import { IsPrice } from '@/common/utils/validation/isPrice';

@Entity()
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
  @IsPrice()
  price: number;

  @Column({
    type: 'money',
    nullable: true,
  })
  @IsNumber()
  @IsPrice()
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

  @Column({
    nullable: true,
  })
  @IsOptional()
  copied: number;
}
