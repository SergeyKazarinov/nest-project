import { IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

import { User } from '@/modules/users/entities/user.entity';
import { Wish } from '@/modules/wishes/entities/wish.entity';

import { BaseEntity } from '@/common/entities/base-entity.entity';

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

  @ManyToMany(() => Wish)
  items: Wish[];

  @ManyToOne(() => User, (user) => user.wishlists, {
    onDelete: 'CASCADE',
  })
  owner: User;
}
