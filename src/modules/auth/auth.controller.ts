import { Body, Controller, Post, Req } from '@nestjs/common';

import { ApiCreateOperation } from '@/common/decorators/swagger';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signin')
  login(@Req() req: Request & { user: User }) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  @ApiCreateOperation('Регистрация пользователя', CreateUserDto)
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return this.authService.login(user);
  }
}
