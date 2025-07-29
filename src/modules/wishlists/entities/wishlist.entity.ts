import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { User } from '@/modules/users/entities/user.entity';
import { Wish } from '@/modules/wishes/entities/wish.entity';

import { BaseEntity } from '@/common/entities/base-entity.entity';

@Entity()
export class Wishlist extends BaseEntity {
  @ApiProperty({
    description: 'Название wishlist-а',
    type: String,
    example: 'Мои пожелания',
    minLength: 1,
    maxLength: 250,
  })
  @Column({
    length: 250,
  })
  @IsNotEmpty({
    message: (args) => `Поле ${args.property} обязательно`,
  })
  @IsString()
  @Length(1, 250)
  name: string;

  @ApiProperty({
    description: 'Описание wishlist-а',
    type: String,
    example: 'Мои пожелания',
    minLength: 1,
    maxLength: 1500,
    required: false,
  })
  @Column({
    length: 1500,
    nullable: true,
  })
  @IsString()
  @Length(1, 1500)
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Ссылка на изображение wishlist-а',
    type: String,
    example: 'https://example.com/image.jpg',
  })
  @Column()
  @IsUrl()
  image: string;

  @ApiProperty({
    description: 'Список подарков wishlist-а',
    type: () => [Wish],
    isArray: true,
  })
  @ManyToMany(() => Wish, {
    cascade: true,
  })
  @JoinTable()
  items: Wish[];

  @ApiProperty({
    description: 'Владелец wishlist-а',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.wishlists, {
    onDelete: 'CASCADE',
  })
  owner: User;
}
