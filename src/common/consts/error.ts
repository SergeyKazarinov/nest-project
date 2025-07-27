export const ERROR_MESSAGES = {
  USER: {
    NOT_FOUND: 'Пользователь не найден',
    ALREADY_EXISTS: 'Пользователь уже существует',
  },
  WISH: {
    NOT_FOUND: 'Подарок не найден',
    PRICE_CANNOT_BE_CHANGED: 'Нельзя изменить цену подарка, на который уже есть желающие скинуться',
  },
  OFFER: {
    NOT_FOUND: 'Заявка не найдена',
    OFFER_FOR_OWN_WISH: 'Нельзя скинуться на собственный подарок',
    OFFER_FOR_WISH_WITH_RAISED: 'Нельзя скинуться на подарок, на который уже собраны деньги',
    OFFER_FOR_WISH_WITH_RAISED_AND_MORE: 'Сумма собранных средств не может превышать стоимость подарка',
  },
  VALIDATION: {
    PRICE_INVALID: 'Цена должна быть положительным числом с максимум 2 знаками после запятой',
  },
  FORBIDDEN: 'У вас нет прав на редактирование',
} as const;
