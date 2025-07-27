import { PickType } from '@nestjs/swagger';

import { Wish } from '../entities/wish.entity';

export class BaseWishDto extends PickType(Wish, ['name', 'link', 'image', 'price', 'description']) {}
