import { ForbiddenException } from '@nestjs/common';

import { User } from '@/modules/users/entities/user.entity';

export const checkForbidden = <Entity>(user: User, entity: Entity, ownerId: number): Entity => {
  if (ownerId !== user.id) {
    throw new ForbiddenException('У вас нет прав на редактирование');
  }

  return entity;
};
