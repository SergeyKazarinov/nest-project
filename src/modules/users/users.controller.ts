import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/modules/auth/guard/jwt-guard';
import { Wish } from '@/modules/wishes/entities/wish.entity';

import { ApiSwaggerOperation } from '@/common/decorators/swagger';
import { RequestWithUser } from '@/common/types/request.types';
import { checkId } from '@/common/utils/service/check-id';

import { GetWishDto } from '../wishes/dto/get-wish.dto';

import { FindUsersDto } from './dto/find-user.dtor';
import { UserProfileResponseDto, UserPublicProfileResponseDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerOperation({
    summary: 'Получение данных пользователя',
    responseType: UserProfileResponseDto,
    isAuth: true,
  })
  findMe(@Req() req: RequestWithUser): UserProfileResponseDto {
    return req.user;
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerOperation({
    summary: 'Обновление данных пользователя',
    responseType: UserProfileResponseDto,
    isAuth: true,
    updatedDescription: 'Данные пользователя успешно обновлены',
  })
  async patchMe(@Req() req: RequestWithUser, @Body() updateUserDto: UpdateUserDto): Promise<UserProfileResponseDto> {
    const user = await this.usersService.update(req.user.id, updateUserDto);
    return user;
  }

  @Get('me/wishes')
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerOperation({
    summary: 'Получение моих списков желаний',
    responseType: GetWishDto,
    isArray: true,
    isAuth: true,
  })
  async getMyWishes(@Req() req: RequestWithUser): Promise<Wish[]> {
    const wishes = await this.usersService.getWishes(req.user.id);
    return wishes;
  }

  @Get(':username/wishes')
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerOperation({
    summary: 'Получение списка желаний пользователя',
    responseType: Wish,
    isArray: true,
    isAuth: true,
    notFoundErrorMessage: 'USER',
  })
  getUserWishes(@Param('username') username: string): Promise<Wish[]> {
    return this.usersService.getWishes(username);
  }

  @Get(':username')
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerOperation({
    summary: 'Получение данных пользователя по username',
    responseType: UserPublicProfileResponseDto,
    isAuth: true,
    notFoundErrorMessage: 'USER',
  })
  findByUsername(@Param('username') username: string): Promise<UserPublicProfileResponseDto> {
    return this.usersService.findUser(username);
  }

  @Post('find')
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerOperation({
    summary: 'Поиск пользователей',
    responseType: UserProfileResponseDto,
    isArray: true,
    isAuth: true,
  })
  @HttpCode(200)
  findMany(@Body() { query }: FindUsersDto): Promise<UserProfileResponseDto[]> {
    return this.usersService.findMany(query);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiSwaggerOperation({
    summary: 'Удаление пользователя',
    responseType: undefined,
    isAuth: true,
    notFoundErrorMessage: 'USER',
    deletedDescription: 'Пользователь успешно удален',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(checkId(id));
  }
}
