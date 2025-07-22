import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

import { ErrorMessageDto, ServerErrorMessageDto } from '../dto/error.dto';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('NestJS API')
  .setDescription('NestJS API description')
  .setVersion('1.0')
  .addGlobalResponse({
    status: 500,
    description: 'Внутренняя ошибка сервера',
    type: ServerErrorMessageDto,
  })
  .addGlobalResponse({
    status: 404,
    description: 'Ресурс не найден',
    type: ErrorMessageDto,
  })
  .addGlobalResponse({
    status: 408,
    description: 'Время ожидания запроса истекло',
    type: ErrorMessageDto,
  })
  .build();

export const swaggerOptions: SwaggerCustomOptions = {};
