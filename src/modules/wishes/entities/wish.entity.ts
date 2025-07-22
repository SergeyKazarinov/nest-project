import { Column, ManyToOne } from 'typeorm';

import { Offer } from '@/modules/offers';
import { User } from '@/modules/users';

import { BaseEntity } from '@/common/entities/baseEntity.entity';

export class Wish extends BaseEntity {
  @Column({
    length: 250,
  })
  name: string;

  @Column()
  link: string;

  @Column()
  image: string;

  @Column({
    type: 'money',
  })
  price: number;

  @Column({
    type: 'money',
  })
  raised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @Column({
    length: 1024,
  })
  description: string;

  @ManyToOne(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @Column()
  copied: number;
}
