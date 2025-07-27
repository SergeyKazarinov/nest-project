import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { ERROR_MESSAGES } from '@/common/consts/error';
import { PRICE_SEPARATOR_REGEX } from '@/common/consts/regex';

@ValidatorConstraint({ async: true })
export class IsPriceConstraint implements ValidatorConstraintInterface {
  validate(price: number) {
    if (typeof price !== 'number' || price < 0) {
      return false;
    }

    const [integer, decimal] = price.toString().split(PRICE_SEPARATOR_REGEX);

    if (!integer || integer.length < 1) {
      return false;
    }

    return !decimal || decimal.length <= 2;
  }

  defaultMessage() {
    return ERROR_MESSAGES.VALIDATION.PRICE_INVALID;
  }
}

export function IsPrice(maxDecimalPlaces = 2, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [maxDecimalPlaces],
      validator: IsPriceConstraint,
    });
  };
}
