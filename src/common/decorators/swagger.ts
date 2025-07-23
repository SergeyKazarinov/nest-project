import { applyDecorators, Type } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

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

export const ApiFindOperation = (summary: string, responseType: Type) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiOkResponse({
      description: 'Запрос выполнен успешно',
      type: [responseType],
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
