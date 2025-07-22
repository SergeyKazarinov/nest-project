import { IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { Wish } from '@/modules/wishes';

import { BaseEntity } from '@/common/entities/baseEntity.entity';

@Entity()
export class Wishlist extends BaseEntity {
  @Column({
    length: 250,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 250)
  name: string;

  @Column({
    length: 1500,
  })
  @IsString()
  @Length(1, 1500)
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @ManyToMany(() => Wish, (wish) => wish.id)
  @JoinTable()
  items: Wish[];
}
