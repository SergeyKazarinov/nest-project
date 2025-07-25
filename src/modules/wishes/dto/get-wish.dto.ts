import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { Offer } from '@/modules/offers/entities/offer.entity';
import { UserPublicProfileResponseDto } from '@/modules/users/dto/get-user.dto';

import { Wish } from '../entities/wish.entity';

export class GetWishDto extends PartialType(OmitType(Wish, ['owner'])) {
  @ApiProperty({
    description: 'Владелец подарка',
    type: () => PartialType(UserPublicProfileResponseDto),
    required: false,
  })
  owner: UserPublicProfileResponseDto;

  @ApiProperty({
    description: 'Список предложений на покупку подарка',
    type: () => [PartialType(Offer)],
    required: false,
  })
  offers: Offer[];
}
