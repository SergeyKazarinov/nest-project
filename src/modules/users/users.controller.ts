import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Req } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { ApiDeleteOperation, ApiFindOperation, ApiUpdateOperation } from '@/common/decorators/swagger';
import { RequestWithUser } from '@/common/types/request.types';

import { Wish } from '../wishes/entities/wish.entity';

import { FindUsersDto } from './dto/find-user.dtor';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiBearerAuth()
  @ApiFindOperation('Получение данных пользователя', GetUserDto)
  findMe(@Req() req: RequestWithUser): GetUserDto {
    return req.user;
  }

  @Patch('me')
  @ApiBearerAuth()
  @ApiUpdateOperation('Обновление данных пользователя', GetUserDto)
  async patchMe(@Req() req: RequestWithUser, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(req.user.id, updateUserDto);
    return user;
  }

  @Get('me/wishes')
  @ApiBearerAuth()
  @ApiFindOperation('Получение списка желаний пользователя', Wish)
  async getMyWishes(@Req() req: RequestWithUser) {
    return this.usersService.getUserWishes(req.user.username);
  }

  @Get(':username/wishes')
  @ApiBearerAuth()
  @ApiFindOperation('Получение списка желаний пользователя', Wish)
  getUserWishes(@Param('username') username: string) {
    return this.usersService.getUserWishes(username);
  }

  @Get(':username')
  @ApiBearerAuth()
  @ApiFindOperation('Получение данных пользователя по username', GetUserDto)
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Post('find')
  @ApiBearerAuth()
  @ApiFindOperation('Поиск пользователей', GetUserDto, true)
  @HttpCode(200)
  findMany(@Body() { query }: FindUsersDto) {
    return this.usersService.findMany(query);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiDeleteOperation('Удаление пользователя')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
