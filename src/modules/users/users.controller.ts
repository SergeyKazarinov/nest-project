import { Body, Controller, Delete, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/modules/auth/guard/jwt-guard';

import { ApiFindOperation, ApiUpdateOperation } from '@/common/decorators/swagger';
import { RequestWithUser } from '@/common/types/request.types';

import { Wish } from '../wishes/entities/wish.entity';

import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiFindOperation('Получение данных пользователя', GetUserDto)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  findMe(@Req() req: RequestWithUser): GetUserDto {
    return req.user;
  }

  @ApiBearerAuth()
  @ApiUpdateOperation('Обновление данных пользователя', GetUserDto)
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async patchMe(@Req() req: RequestWithUser, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(req.user.id, updateUserDto);
    return user;
  }

  @ApiBearerAuth()
  @ApiFindOperation('Получение списка желаний пользователя', Wish)
  @UseGuards(JwtAuthGuard)
  @Get('me/wishes')
  async getMyWishes(@Req() req: RequestWithUser) {
    return this.usersService.getUserWishes(req.user.username);
  }

  @ApiBearerAuth()
  @ApiFindOperation('Получение списка желаний пользователя', Wish)
  @UseGuards(JwtAuthGuard)
  @Get(':username/wishes')
  getUserWishes(@Param('username') username: string) {
    return this.usersService.getUserWishes(username);
  }

  @ApiBearerAuth()
  @ApiFindOperation('Получение данных пользователя по username', GetUserDto)
  @UseGuards(JwtAuthGuard)
  @Get(':username')
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
