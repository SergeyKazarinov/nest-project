import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponseNoStatusOptions,
} from '@nestjs/swagger';

import { BadRequestErrorDto } from '../dto/error.dto';

export const ApiCreateOperation = (summary: string, responseType: Type) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiCreatedResponse({
      description: 'Ресурс успешно создан',
      type: responseType,
    }),
    ApiBadRequestResponse({
      description: 'Некорректные данные',
      type: BadRequestErrorDto,
    }),
  );

export const ApiFindOperation = (summary: string, responseType: Type, isArray: boolean = false) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiOkResponse({
      description: 'Запрос выполнен успешно',
      type: isArray ? [responseType] : responseType,
    }),
    ApiBadRequestResponse({
      description: 'Некорректные параметры запроса',
      type: BadRequestErrorDto,
    }),
  );

export const ApiUpdateOperation = (summary: string, responseType: Type) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiOkResponse({
      description: 'Ресурс успешно обновлен',
      type: responseType,
    }),
    ApiBadRequestResponse({
      description: 'Некорректные данные',
      type: BadRequestErrorDto,
    }),
  );

export const ApiDeleteOperation = (summary: string) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiOkResponse({
      description: 'Ресурс успешно удален',
    }),
    ApiBadRequestResponse({
      description: 'Некорректные параметры запроса',
      type: BadRequestErrorDto,
    }),
  );

export const ApiLoginOperation = (summary: string, options: ApiResponseNoStatusOptions) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiOkResponse({
      description: 'Пользователь успешно авторизован',
      example: {
        access_token:
          'eyJhbGciOisIUzI1NiIsInR5cCI6IkpXVCJ9.wyJzdWIiOjUsImlhdCI6MTc1MzM0MTQ4MH0.Ix-54mlAh1AxN7sNwXH7S9_fJ9HqMFqx-Qq8eAPy0DI',
      },
      ...options,
    }),
    ApiBadRequestResponse({
      description: 'Некорректные данные',
      type: BadRequestErrorDto,
    }),
  );
