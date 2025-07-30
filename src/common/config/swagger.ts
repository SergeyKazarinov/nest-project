import { HttpStatus } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

import { ERROR_MESSAGES } from '../consts/error';
import { InternalServerErrorDto, RequestTimeoutErrorDto } from '../dto/error.dto';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('NestJS API')
  .setDescription('NestJS API description')
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
