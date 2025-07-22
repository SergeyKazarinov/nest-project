import { ApiProperty } from '@nestjs/swagger';

export class ErrorMessageDto {
  @ApiProperty({
    description: 'Код ошибки',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Сообщение об ошибке',
    example: ['Некорректные данные'],
  })
  message: string[];

  @ApiProperty({
    description: 'Тип ошибки',
    example: 'Bad Request',
  })
  error: string;
}

export class ServerErrorMessageDto {
  @ApiProperty({
    description: 'Код ошибки',
    example: 500,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Сообщение об ошибке',
    example: ['Внутренняя ошибка сервера'],
  })
  message: string[];

  @ApiProperty({
    description: 'Тип ошибки',
    example: 'Internal Server Error',
  })
  error: string;
}
