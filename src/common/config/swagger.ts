import { HttpStatus } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

import { ERROR_MESSAGES } from '../consts/error';
import { InternalServerErrorDto, RequestTimeoutErrorDto } from '../dto/error.dto';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('NestJS API')
  .setDescription(
    `
    Сервис для создания и обновления списков желаний, а также для создания и обновления заявок на подарки
В данном сервисе каждый зарегистрированный пользователь может рассказать о том, какой подарок он бы хотел получить, а также скинуться на подарок для другого пользователя, указав сумму, которую готов на это потратить.`,
  )
  .setVersion('1.0')
  .addBearerAuth()
  .addGlobalResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    type: InternalServerErrorDto,
  })
  .addGlobalResponse({
    status: HttpStatus.REQUEST_TIMEOUT,
    description: ERROR_MESSAGES.REQUEST_TIMEOUT,
    type: RequestTimeoutErrorDto,
    isArray: false,
  })
  .build();

export const swaggerOptions: SwaggerCustomOptions = {};
