import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { UserPublicProfileResponseDto } from '@/modules/users/dto/get-user.dto';
import { GetWishDto } from '@/modules/wishes/dto/get-wish.dto';

import { Offer } from '../entities/offer.entity';

export class GetOfferDto extends PartialType(OmitType(Offer, ['user', 'item'])) {
  @ApiProperty({
    description: 'Пользователь, который сделал предложение',
    type: PartialType(UserPublicProfileResponseDto),
    required: false,
  })
  user: UserPublicProfileResponseDto;

  @ApiProperty({
    description: 'Подарок, на который сделано предложение',
    required: false,
    type: () => GetWishDto,
  })
  item: GetWishDto;
}
