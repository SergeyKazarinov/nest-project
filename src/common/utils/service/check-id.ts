import { BadRequestException } from '@nestjs/common';

import { ERROR_MESSAGES } from '@/common/consts/error';

export const checkId = (id: string) => {
  if (isNaN(+id)) {
    throw new BadRequestException(ERROR_MESSAGES.BAD_REQUEST.ID_NOT_NUMBER);
  }

  return +id;
};
