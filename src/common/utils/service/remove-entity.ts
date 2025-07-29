import { InternalServerErrorException } from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';

import { ERROR_MESSAGES } from '@/common/consts/error';

type TErrorGroup = {
  [K in keyof typeof ERROR_MESSAGES]: (typeof ERROR_MESSAGES)[K] extends { REMOVE_FAILED: string } ? K : never;
}[keyof typeof ERROR_MESSAGES];

export const removeEntity = async <Entity extends ObjectLiteral>(
  repository: Repository<Entity>,
  id: number,
  group: TErrorGroup,
): Promise<void> => {
  const removedResult = await repository.delete(id);

  if (removedResult.affected === 0) {
    throw new InternalServerErrorException(ERROR_MESSAGES[group].REMOVE_FAILED);
  }
};
