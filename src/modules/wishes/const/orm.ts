import { PUBLIC_USER_PROFILE_SELECT } from '@/modules/users/const/orm';

export const WISH_RELATIONS = {
  owner: true,
  offers: {
    user: true,
  },
} as const;

export const WISH_SELECT = {
  owner: PUBLIC_USER_PROFILE_SELECT,
} as const;

export const GET_WISH_DTO_ORM_OPTIONS = {
  relations: WISH_RELATIONS,
  select: WISH_SELECT,
} as const;
