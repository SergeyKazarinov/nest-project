import { InternalServerErrorException } from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';

import { ERROR_MESSAGES } from '@/common/consts/error';
import { TRemoveErrorKey } from '@/common/types/error.types';

export const removeEntity = async <Entity extends ObjectLiteral>(
  repository: Repository<Entity>,
  id: number,
  removeErrorKey: TRemoveErrorKey,
): Promise<void> => {
  const removedResult = await repository.delete(id);

  if (removedResult.affected === 0) {
    throw new InternalServerErrorException(ERROR_MESSAGES[removeErrorKey].REMOVE_FAILED);
  }
};
