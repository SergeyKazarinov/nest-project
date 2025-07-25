import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/modules/auth/guard/jwt-guard';
import { Wish } from '@/modules/wishes/entities/wish.entity';

import { ApiDeleteOperation, ApiFindOperation, ApiUpdateOperation } from '@/common/decorators/swagger';
import { RequestWithUser } from '@/common/types/request.types';

import { FindUsersDto } from './dto/find-user.dtor';
import { UserProfileResponseDto, UserPublicProfileResponseDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiFindOperation('Получение данных пользователя', UserProfileResponseDto)
  findMe(@Req() req: RequestWithUser): UserProfileResponseDto {
    return req.user;
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUpdateOperation('Обновление данных пользователя', UserProfileResponseDto)
  async patchMe(@Req() req: RequestWithUser, @Body() updateUserDto: UpdateUserDto): Promise<UserProfileResponseDto> {
    const user = await this.usersService.update(req.user.id, updateUserDto);
    return user;
  }

  @Get('me/wishes')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiFindOperation('Получение списка желаний пользователя', Wish, true)
  async getMyWishes(@Req() req: RequestWithUser): Promise<Wish[]> {
    const wishes = await this.usersService.getWishes(req.user.id);
    return wishes;
  }

  @Get(':username/wishes')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiFindOperation('Получение списка желаний пользователя', Wish)
  getUserWishes(@Param('username') username: string): Promise<Wish[]> {
    return this.usersService.getWishes(username);
  }

  @Get(':username')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiFindOperation('Получение данных пользователя по username', UserPublicProfileResponseDto)
  findByUsername(@Param('username') username: string): Promise<UserPublicProfileResponseDto> {
    return this.usersService.findUser(username);
  }

  @Post('find')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiFindOperation('Поиск пользователей', UserProfileResponseDto, true)
  @HttpCode(200)
  findMany(@Body() { query }: FindUsersDto): Promise<UserProfileResponseDto[]> {
    return this.usersService.findMany(query);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiDeleteOperation('Удаление пользователя')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
