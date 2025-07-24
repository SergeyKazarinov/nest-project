import { HttpStatus } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

import { InternalServerErrorDto, NotFoundErrorDto, RequestTimeoutErrorDto } from '../dto/error.dto';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('NestJS API')
  .setDescription('NestJS API description')
  .setVersion('1.0')
  .addBearerAuth()
  .addGlobalResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Внутренняя ошибка сервера',
    type: InternalServerErrorDto,
  })
  .addGlobalResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Ресурс не найден',
    type: NotFoundErrorDto,
  })
  .addGlobalResponse({
    status: HttpStatus.REQUEST_TIMEOUT,
    description: 'Время ожидания запроса истекло',
    type: RequestTimeoutErrorDto,
  })
  .build();

export const swaggerOptions: SwaggerCustomOptions = {};
