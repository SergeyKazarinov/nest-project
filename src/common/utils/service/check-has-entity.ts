import { NotFoundException } from '@nestjs/common';

import { ERROR_MESSAGES } from '@/common/consts/error';

type TErrorGroup = {
  [K in keyof typeof ERROR_MESSAGES]: (typeof ERROR_MESSAGES)[K] extends { NOT_FOUND: string } ? K : never;
}[keyof typeof ERROR_MESSAGES];

export const checkHasEntity = <Entity>(entity: Entity | null, group: TErrorGroup): Entity => {
  if (!entity) {
    throw new NotFoundException(ERROR_MESSAGES[group].NOT_FOUND);
  }

  return entity;
};
