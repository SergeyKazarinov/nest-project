import { User } from '../entities/user.entity';

export type GetUserDto = Omit<User, 'password'>;
