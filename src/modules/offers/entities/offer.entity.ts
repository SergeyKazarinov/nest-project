import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';

import { User } from '@/modules/users/entities/user.entity';
import { Wish } from '@/modules/wishes/entities/wish.entity';

import { BaseEntity } from '@/common/entities/base-entity.entity';
import { IsPrice } from '@/common/utils/validation/is-price';

@Entity()
export class Offer extends BaseEntity {
  @ApiProperty({
    description: 'Пользователь, который сделал предложение',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @ApiProperty({
    description: 'Подарок, на который сделано предложение',
    type: () => Wish,
  })
  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @ApiProperty({
    description: 'Сумма предложения',
    type: Number,
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 1,
  })
  @IsNumber()
  @IsPrice()
  amount: number;

  @ApiProperty({
    description: 'Скрыто ли предложение',
    type: Boolean,
  })
  @Column({
    type: 'boolean',
  })
  @IsBoolean()
  @IsNotEmpty()
  hidden: boolean;
}
