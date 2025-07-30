import { ERROR_MESSAGES } from '../consts/error';

export enum ErrorType {
  BAD_REQUEST = 'Bad Request',
  NOT_FOUND = 'Not Found',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  REQUEST_TIMEOUT = 'Request Timeout',
  CONFLICT = 'Conflict',
}

export type TNotFoundErrorKey = {
  [K in keyof typeof ERROR_MESSAGES]: (typeof ERROR_MESSAGES)[K] extends { NOT_FOUND: string } ? K : never;
}[keyof typeof ERROR_MESSAGES];

export type TRemoveErrorKey = {
  [K in keyof typeof ERROR_MESSAGES]: (typeof ERROR_MESSAGES)[K] extends { REMOVE_FAILED: string } ? K : never;
}[keyof typeof ERROR_MESSAGES];
