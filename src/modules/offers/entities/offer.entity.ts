import { Column, ManyToOne, OneToMany } from 'typeorm';

import { User } from '@/modules/users';
import { Wish } from '@/modules/wishes';

import { BaseEntity } from '@/common/entities/baseEntity.entity';

export class Offer extends BaseEntity {
  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @OneToMany(() => Wish, (wish) => wish.offers)
  item: Wish;

  @Column({
    type: 'money',
  })
  amount: number;

  @Column({
    type: 'boolean',
  })
  hidden: boolean;
}
