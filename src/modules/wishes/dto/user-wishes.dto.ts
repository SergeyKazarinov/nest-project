import { OmitType } from '@nestjs/swagger';

import { Wish } from '../entities/wish.entity';

export class UserWishesResponseDto extends OmitType(Wish, ['owner']) {}
