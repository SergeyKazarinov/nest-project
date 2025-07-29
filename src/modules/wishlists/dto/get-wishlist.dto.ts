import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { UserPublicProfileResponseDto } from '@/modules/users/dto/get-user.dto';
import { GetWishDto } from '@/modules/wishes/dto/get-wish.dto';

import { Wishlist } from '../entities/wishlist.entity';

export class GetWishlistDto extends PartialType(OmitType(Wishlist, ['owner', 'items'])) {
  @ApiProperty({
    description: 'Владелец wishlist-а',
    type: () => UserPublicProfileResponseDto,
    required: false,
  })
  owner: UserPublicProfileResponseDto;

  @ApiProperty({
    description: 'Список подарков wishlist-а',
    type: () => [GetWishDto],
    required: false,
  })
  items: GetWishDto[];
}
