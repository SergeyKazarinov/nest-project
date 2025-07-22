import { OneToMany } from 'typeorm';

import { Wish } from '@/modules/wishes';

import { BaseEntity } from '@/common/entities/baseEntity.entity';

export class Offer extends BaseEntity {
  @OneToMany(() => Wish, (wish) => wish.offers)
  item: Wish;
}
