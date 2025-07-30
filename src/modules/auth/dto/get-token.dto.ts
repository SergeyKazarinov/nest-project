import { ApiProperty } from '@nestjs/swagger';

export class GetTokenDto {
  @ApiProperty({
    description: 'Токен доступа',
    example: 'string',
  })
  access_token: string;
}
