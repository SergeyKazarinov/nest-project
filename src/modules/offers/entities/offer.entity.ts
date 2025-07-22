import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { User } from '@/modules/users';
import { Wish } from '@/modules/wishes';

import { BaseEntity } from '@/common/entities/baseEntity.entity';
import { IsPrice } from '@/common/utils/validation/isPrice';

@Entity()
export class Offer extends BaseEntity {
  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @OneToMany(() => Wish, (wish) => wish.offers)
  item: Wish;

  @Column({
    type: 'money',
  })
  @IsNumber()
  @IsPrice()
  amount: number;

  @Column({
    type: 'boolean',
  })
  @IsBoolean()
  @IsNotEmpty()
  hidden: boolean;
}
