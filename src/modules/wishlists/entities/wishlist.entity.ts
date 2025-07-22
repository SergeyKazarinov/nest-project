import { Column, JoinTable, ManyToMany } from 'typeorm';

import { Wish } from '@/modules/wishes';

import { BaseEntity } from '@/common/entities/baseEntity.entity';

export class Wishlist extends BaseEntity {
  @Column({
    length: 250,
  })
  name: string;

  @Column({
    length: 1500,
  })
  description: string;

  @Column()
  image: string;

  @ManyToMany(() => Wish, (wish) => wish.id)
  @JoinTable()
  items: Wish[];
}
