import { ForbiddenException } from '@nestjs/common';

import { User } from '@/modules/users/entities/user.entity';

import { ERROR_MESSAGES } from '@/common/consts/error';

export const checkForbidden = <Entity>(user: User, entity: Entity, ownerId: number): Entity => {
  if (ownerId !== user.id) {
    throw new ForbiddenException(ERROR_MESSAGES.FORBIDDEN);
  }

  return entity;
};
