import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { GetOfferDto } from '@/modules/offers/dto/get-offer.dto';
import { UserPublicProfileResponseDto } from '@/modules/users/dto/get-user.dto';

import { Wish } from '../entities/wish.entity';

export class GetWishDto extends PartialType(OmitType(Wish, ['owner', 'offers'])) {
  @ApiProperty({
    description: 'Владелец подарка',
    type: () => PartialType(UserPublicProfileResponseDto),
    required: false,
  })
  owner: UserPublicProfileResponseDto;

  @ApiProperty({
    description: 'Список предложений на покупку подарка',
    type: () => [PartialType(GetOfferDto)],
    required: false,
  })
  offers: GetOfferDto[];
}
