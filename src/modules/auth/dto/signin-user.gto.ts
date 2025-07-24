import { ApiProperty } from '@nestjs/swagger';

export class SigninUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'John Doe',
  })
  username: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: 'password',
  })
  password: string;
}
