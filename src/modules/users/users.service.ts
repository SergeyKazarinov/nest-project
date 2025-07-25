import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, ILike, Repository } from 'typeorm';

import { hashPassword } from '@/common/utils/service/hash-password';

import { CreateUserDto } from './dto/create-user.dto';
import { UserProfileResponseDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private UsersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.UsersRepository.create(createUserDto);
    const savedUser = await this.UsersRepository.save(user);
    return savedUser;
  }

  async findMany(query: string) {
    const users = await this.UsersRepository.find({
      where: [{ username: ILike(`%${query}%`) }, { email: ILike(`%${query}%`) }],
    });
    return users;
  }

  async findById(id: number) {
    const user = await this.UsersRepository.findBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByUsername(username: string, options?: FindOneOptions<User>) {
    const user = await this.UsersRepository.findOne({
      where: { username: ILike(username) },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        username: true,
        avatar: true,
        about: true,
      },
      ...options,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserProfileResponseDto> {
    const user = await this.UsersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password } = updateUserDto;

    if (password) {
      const hashedPassword = await hashPassword(password);
      updateUserDto.password = hashedPassword;
    }

    await this.UsersRepository.update(id, updateUserDto);
    const { password: _, ...updatedUser } = { ...user, ...updateUserDto };

    return updatedUser;
  }

  async getMyWishes(id: number) {
    const user = await this.UsersRepository.findOne({
      where: { id },
      relations: {
        wishes: {
          offers: {
            user: true,
          },
          owner: true,
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.wishes;
  }

  async getUserWishes(username: string) {
    const user = await this.UsersRepository.findOne({
      where: { username },
      relations: {
        wishes: {
          offers: {
            user: true,
          },
          owner: true,
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.wishes;
  }

  async remove(id: number) {
    const result = await this.UsersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Пользователь не найден');
    }
    return {};
  }
}
