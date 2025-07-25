import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { UserProfileResponseDto } from '@/modules/users/dto/get-user.dto';
import { User } from '@/modules/users/entities/user.entity';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: User['username'], password: User['password']): Promise<UserProfileResponseDto> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new BadRequestException(['Не верное имя пользователя или пароль']);
    }
    return user;
  }
}
