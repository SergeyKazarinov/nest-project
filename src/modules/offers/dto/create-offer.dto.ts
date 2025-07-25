import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOfferDto {
  @ApiProperty({
    description: 'Сумма покупки',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    description: 'Скрыть предложение',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  hidden: boolean;

  @ApiProperty({
    description: 'ID подарка',
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
