import { ApiProperty, PickType } from '@nestjs/swagger';

import { Wishlist } from '../entities/wishlist.entity';

export class CreateWishlistDto extends PickType(Wishlist, ['name', 'image', 'description']) {
  @ApiProperty({
    description: 'Список id подарков',
    type: [Number],
    example: [1],
    isArray: true,
  })
  itemsId: number[];
}
