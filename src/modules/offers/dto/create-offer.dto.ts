import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { BaseOfferDto } from './base-offer.dto';

export class CreateOfferDto extends BaseOfferDto {
  @ApiProperty({
    description: 'Id подарка',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  itemId: number;
}

export class CreateOfferWithUserIdDto extends CreateOfferDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
