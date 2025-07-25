import { NotFoundException } from '@nestjs/common';

export const checkHasEntity = <Entity>(entity: Entity | null, errorMessage: string): Entity => {
  if (!entity) {
    throw new NotFoundException(errorMessage);
  }

  return entity;
};
