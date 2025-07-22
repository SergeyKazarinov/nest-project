import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiRequestTimeoutResponse,
} from '@nestjs/swagger';

import { ErrorMessageDto } from '../dto/error.dto';

export const ApiCreateOperation = (responseType: Type) =>
  applyDecorators(
    ApiCreatedResponse({
      description: 'Ресурс успешно создан',
      type: responseType,
    }),
    ApiBadRequestResponse({
      description: 'Некорректные данные',
      type: ErrorMessageDto,
    }),
    ApiRequestTimeoutResponse({
      description: 'Время ожидания запроса истекло',
    }),
  );

export const ApiFindAllOperation = (summary: string, responseType: Type) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiOkResponse({
      description: 'Список ресурсов успешно получен',
      type: [responseType],
    }),
  );

export const ApiFindOneOperation = (summary: string, responseType: Type) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiOkResponse({
      description: 'Ресурс успешно найден',
      type: responseType,
    }),
    ApiNotFoundResponse({
      description: 'Ресурс не найден',
      type: ErrorMessageDto,
    }),
    ApiBadRequestResponse({
      description: 'Некорректные параметры запроса',
      type: ErrorMessageDto,
    }),
  );

export const ApiUpdateOperation = (summary: string, responseType: Type) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiOkResponse({
      description: 'Ресурс успешно обновлен',
      type: responseType,
    }),
    ApiNotFoundResponse({
      description: 'Ресурс не найден',
      type: ErrorMessageDto,
    }),
    ApiBadRequestResponse({
      description: 'Некорректные данные',
      type: ErrorMessageDto,
    }),
  );

export const ApiDeleteOperation = (summary: string) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiOkResponse({
      description: 'Ресурс успешно удален',
    }),
    ApiNotFoundResponse({
      description: 'Ресурс не найден',
      type: ErrorMessageDto,
    }),
    ApiBadRequestResponse({
      description: 'Некорректные параметры запроса',
      type: ErrorMessageDto,
    }),
  );
