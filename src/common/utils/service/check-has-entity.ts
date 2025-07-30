import { NotFoundException } from '@nestjs/common';

import { ERROR_MESSAGES } from '@/common/consts/error';
import { TNotFoundErrorKey } from '@/common/types/error.types';

export const checkHasEntity = <Entity>(entity: Entity | null, notFoundErrorKey: TNotFoundErrorKey): Entity => {
  if (!entity) {
    throw new NotFoundException(ERROR_MESSAGES[notFoundErrorKey].NOT_FOUND);
  }

  return entity;
};
