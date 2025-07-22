import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl, Length } from 'class-validator';

import { IsPrice } from '@/common/utils/validation/isPrice';

export class CreateWishDto {
  @ApiProperty({
    description: 'Название подарка',
    example: 'Test',
    minLength: 1,
    maxLength: 250,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 250)
  name: string;

  @ApiProperty({
    description: 'Ссылка на интернет-магазин, в котором можно приобрести подарок',
    example: 'https://www.google.com',
  })
  @IsUrl()
  link: string;

  @ApiProperty({
    description: 'Ссылка на изображение подарка',
    example: 'https://www.google.com',
  })
  @IsUrl()
  image: string;

  @ApiProperty({
    description: 'Стоимость подарка, с округлением до сотых',
    example: 10.01,
  })
  @IsNumber()
  @IsPrice()
  price: number;

  @ApiProperty({
    description: 'Описание подарка',
    example: 'Описание подарка',
  })
  @IsString()
  @Length(1, 1024)
  description: string;
}
