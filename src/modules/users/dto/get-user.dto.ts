import { OmitType } from '@nestjs/swagger';

import { User } from '../entities/user.entity';

export class UserProfileResponseDto extends OmitType(User, ['password', 'wishes', 'offers', 'wishlists']) {}

export class UserPublicProfileResponseDto extends OmitType(UserProfileResponseDto, ['email']) {}
