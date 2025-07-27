export const ERROR_MESSAGES = {
  USER: {
    NOT_FOUND: 'Пользователь не найден',
    ALREADY_EXISTS: 'Пользователь уже существует',
  },
  WISH: {
    NOT_FOUND: 'Подарок не найден',
    PRICE_CANNOT_BE_CHANGED: 'Нельзя изменить цену подарка, на который уже есть желающие скинуться',
  },
  FORBIDDEN: 'У вас нет прав на редактирование',
} as const;
