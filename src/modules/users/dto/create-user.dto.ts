import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'John Doe',
    minLength: 1,
    maxLength: 30,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  username: string;

  @ApiProperty({
    description: 'Описание пользователя',
    example: 'John Doe',
    minLength: 2,
    maxLength: 1500,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 1500)
  @IsOptional()
  about?: string;

  @ApiProperty({
    description: 'Аватар пользователя',
    example: 'https://i.pravatar.cc/300',
  })
  @IsUrl()
  avatar: string;

  @ApiProperty({
    description: 'Email пользователя',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
