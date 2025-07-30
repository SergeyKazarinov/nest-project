import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { ERROR_MESSAGES } from '../consts/error';
import { ErrorType, TNotFoundErrorKey } from '../types/error.types';

interface ErrorDtoConfig {
  statusCode: HttpStatus;
  message: string | string[];
  errorType: ErrorType;
}

export class ErrorFactory {
  static create(config: ErrorDtoConfig) {
    class GeneratedErrorDto {
      @ApiProperty({
        description: 'Код ошибки',
        example: config.statusCode,
      })
      statusCode: number;

      @ApiProperty({
        description: 'Сообщение об ошибке',
        example: [config.message],
      })
      message: string[];

      @ApiProperty({
        description: 'Тип ошибки',
        example: config.errorType,
      })
      error: ErrorType;
    }

    const className = `${config.errorType.replace(/\s+/g, '')}ErrorDto`;

    Object.defineProperty(GeneratedErrorDto, 'name', { value: className });

    return GeneratedErrorDto;
  }
}

export const BadRequestErrorDto = ErrorFactory.create({
  statusCode: HttpStatus.BAD_REQUEST,
  message: ['Некорректные данные'],
  errorType: ErrorType.BAD_REQUEST,
});

export const NotFoundErrorDto = (notFoundErrorKey: TNotFoundErrorKey) =>
  ErrorFactory.create({
    statusCode: HttpStatus.NOT_FOUND,
    message: ERROR_MESSAGES[notFoundErrorKey].NOT_FOUND,
    errorType: ErrorType.NOT_FOUND,
  });

export const InternalServerErrorDto = ErrorFactory.create({
  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  errorType: ErrorType.INTERNAL_SERVER_ERROR,
});

export const UnauthorizedErrorDto = ErrorFactory.create({
  statusCode: HttpStatus.UNAUTHORIZED,
  message: 'Не авторизован',
  errorType: ErrorType.UNAUTHORIZED,
});

export const ForbiddenErrorDto = ErrorFactory.create({
  statusCode: HttpStatus.FORBIDDEN,
  message: ERROR_MESSAGES.FORBIDDEN,
  errorType: ErrorType.FORBIDDEN,
});

export const RequestTimeoutErrorDto = ErrorFactory.create({
  statusCode: HttpStatus.REQUEST_TIMEOUT,
  message: ERROR_MESSAGES.REQUEST_TIMEOUT,
  errorType: ErrorType.REQUEST_TIMEOUT,
});

export const ForbidderErrorDto = ErrorFactory.create({
  statusCode: HttpStatus.FORBIDDEN,
  message: ERROR_MESSAGES.FORBIDDEN,
  errorType: ErrorType.FORBIDDEN,
});
