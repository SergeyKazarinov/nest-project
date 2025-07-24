import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { UsersService } from '@/modules/users/users.service';

import { ApiCreateOperation } from '@/common/decorators/swagger';
import { RequestWithUser } from '@/common/types/request.types';

import { SigninUserDto } from './dto/signin-user.gto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  login(@Req() req: RequestWithUser, @Body() _: SigninUserDto) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  @ApiCreateOperation('Регистрация пользователя', CreateUserDto)
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return this.authService.login(user);
  }
}
