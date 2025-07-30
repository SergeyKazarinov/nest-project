import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponseCommonMetadata,
  ApiResponseExamples,
} from '@nestjs/swagger';

import { ERROR_MESSAGES } from '../consts/error';
import { BadRequestErrorDto, ForbidderErrorDto, NotFoundErrorDto } from '../dto/error.dto';
import { TNotFoundErrorKey } from '../types/error.types';

interface ISwaggerDecoratorFactoryConfig {
  summary: ApiResponseExamples['summary'];
  responseType: ApiResponseCommonMetadata['type'];
  isAuth?: boolean;
  isArray?: boolean;
  isLogin?: boolean;
  okDescription?: string;
  createdDescription?: string;
  updatedDescription?: string;
  deletedDescription?: string;
  notFoundErrorMessage?: TNotFoundErrorKey;
}

class SwaggerDecoratorFactory {
  static create(config: ISwaggerDecoratorFactoryConfig) {
    const {
      summary,
      responseType,
      isAuth = false,
      isArray = false,
      isLogin = false,
      okDescription,
      createdDescription,
      updatedDescription,
      deletedDescription,
      notFoundErrorMessage,
    } = config;

    const decorators = [
      ApiOperation({ summary }),
      ApiBadRequestResponse({
        description: 'Некорректные данные',
        type: BadRequestErrorDto,
        isArray,
      }),
    ];

    if (isAuth) {
      decorators.push(ApiBearerAuth());
    }

    if (okDescription) {
      decorators.push(
        ApiOkResponse({
          description: okDescription,
          type: isArray ? [() => responseType] : responseType,
        }),
      );
    }

    if (createdDescription) {
      decorators.push(
        ApiCreatedResponse({
          description: createdDescription,
          type: responseType,
        }),
      );
    }

    if (updatedDescription) {
      decorators.push(
        ApiOkResponse({
          description: updatedDescription,
          type: responseType,
        }),
        ApiForbiddenResponse({
          description: ERROR_MESSAGES.FORBIDDEN,
          type: ForbidderErrorDto,
        }),
      );
    }

    if (deletedDescription) {
      decorators.push(
        ApiOkResponse({
          description: deletedDescription,
        }),
        ApiForbiddenResponse({
          description: ERROR_MESSAGES.FORBIDDEN,
          type: ForbidderErrorDto,
        }),
      );
    }

    if (notFoundErrorMessage) {
      decorators.push(
        ApiNotFoundResponse({
          description: ERROR_MESSAGES[notFoundErrorMessage].NOT_FOUND,
          type: NotFoundErrorDto(notFoundErrorMessage),
        }),
      );
    }

    if (isLogin) {
      decorators.push(
        ApiOkResponse({
          description: 'Пользователь успешно авторизован',
          type: responseType,
        }),
      );
    }

    return applyDecorators(...decorators);
  }
}

export const ApiSwaggerOperation = (config: ISwaggerDecoratorFactoryConfig) => SwaggerDecoratorFactory.create(config);
