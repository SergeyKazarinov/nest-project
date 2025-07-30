import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';

import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { UsersService } from '@/modules/users/users.service';

import { ApiSwaggerOperation } from '@/common/decorators/swagger';
import { RequestWithUser } from '@/common/types/request.types';
import { hashPassword } from '@/common/utils/service/hash-password';

import { GetTokenDto } from './dto/get-token.dto';
import { SigninUserDto } from './dto/signin-user.gto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  @ApiSwaggerOperation({
    summary: 'Авторизация пользователя',
    responseType: GetTokenDto,
    isLogin: true,
  })
  @HttpCode(HttpStatus.OK)
  login(@Req() req: RequestWithUser, @Body() _: SigninUserDto) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  @ApiSwaggerOperation({
    summary: 'Регистрация пользователя',
    responseType: CreateUserDto,
    createdDescription: 'Пользователь успешно зарегистрирован',
  })
  async signup(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await hashPassword(createUserDto.password);

    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.authService.login(user);
  }
}
