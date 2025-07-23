import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { PRICE_SEPARATOR_REGEX } from '@/common/consts/regex';

@ValidatorConstraint({ async: true })
export class IsPriceConstraint implements ValidatorConstraintInterface {
  validate(price: number) {
    const [integer, decimal] = price.toString().split(PRICE_SEPARATOR_REGEX);
    return typeof price === 'number' && price >= 0 && integer.length >= 0 && decimal?.length === 2;
  }
}

export function IsPrice(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPriceConstraint,
    });
  };
}
