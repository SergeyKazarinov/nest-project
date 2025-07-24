import { User } from '@/modules/users/entities/user.entity';

export type RequestWithUser = Request & { user: User };
