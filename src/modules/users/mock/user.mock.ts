import { CreateUserDto } from '../dto/create-user.dto';
import { UserProfileResponseDto } from '../dto/get-user.dto';

export const USER_PROFILE_MOCK: UserProfileResponseDto = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  username: 'username',
  email: 'username@example.com',
  avatar: 'https://i.pravatar.cc/300',
  about: 'Пока ничего не рассказал о себе',
};

export const CREATE_USER_DTO_MOCK: CreateUserDto = {
  username: USER_PROFILE_MOCK.username,
  email: USER_PROFILE_MOCK.email,
  avatar: USER_PROFILE_MOCK.avatar,
  about: USER_PROFILE_MOCK.about,
  password: 'password',
};
