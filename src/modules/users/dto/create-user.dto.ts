import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, Length } from 'class-validator';

import { User } from '../entities/user.entity';

export class CreateUserDto extends PickType(User, ['username', 'email', 'password']) {
  @ApiProperty({
    description: 'Описание пользователя',
    example: 'John Doe',
    minLength: 2,
    maxLength: 1500,
    required: false,
  })
  @IsString()
  @Length(2, 1500)
  @IsOptional()
  about?: User['about'];

  @ApiProperty({
    description: 'Аватар пользователя',
    example: 'https://i.pravatar.cc/300',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  avatar?: User['avatar'];
}
