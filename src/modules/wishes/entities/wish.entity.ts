import { ManyToOne } from 'typeorm';

import { User } from '@/modules/users';

import { BaseEntity } from '@/common/entities/baseEntity.entity';

export class Wish extends BaseEntity {
  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;
}
