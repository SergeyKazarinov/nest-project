import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindUsersDto {
  @ApiProperty({
    description: 'Поисковый запрос',
    example: 'John',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  query: string;
}
