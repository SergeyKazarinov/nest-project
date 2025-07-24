import { ApiProperty } from '@nestjs/swagger';

export class GetTokenDto {
  @ApiProperty({
    description: 'Токен доступа',
    example:
      'eyJhbGciOisIUzI1NiIsInR5cCI6IkpXVCJ9.wyJzdWIiOjUsImlhdCI6MTc1MzM0MTQ4MH0.Ix-54mlAh1AxN7sNwXH7S9_fJ9HqMFqx-Qq8eAPy0DI',
  })
  access_token: string;
}
