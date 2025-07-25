import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, ILike, Repository } from 'typeorm';

import { Wish } from '@/modules/wishes/entities/wish.entity';

import { ERROR_MESSAGES } from '@/common/consts/error';
import { checkHasEntity } from '@/common/utils/service/check-has-entity';
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
    const userExists = await this.UsersRepository.findOne({
      where: [{ username: ILike(createUserDto.username) }, { email: ILike(createUserDto.email) }],
    });

    if (userExists) {
      throw new ConflictException(ERROR_MESSAGES.USER_ALREADY_EXISTS);
    }

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
    const user = await this.UsersRepository.findOne({ where: { id } });

    return checkHasEntity(user, ERROR_MESSAGES.USER_NOT_FOUND);
  }

  async findByUsername(username: string, options?: FindOneOptions<User>) {
    const data = await this.UsersRepository.findOne({
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

    return checkHasEntity(data, ERROR_MESSAGES.USER_NOT_FOUND);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserProfileResponseDto> {
    const userData = await this.UsersRepository.findOne({
      where: { id },
    });

    const user = checkHasEntity(userData, ERROR_MESSAGES.USER_NOT_FOUND);

    const { password } = updateUserDto;

    if (password) {
      const hashedPassword = await hashPassword(password);
      updateUserDto.password = hashedPassword;
    }

    await this.UsersRepository.update(id, updateUserDto);
    const { password: _, ...updatedUser } = { ...user, ...updateUserDto };

    return updatedUser;
  }

  async getWishes(id: number): Promise<Wish[]>;
  async getWishes(username: string): Promise<Wish[]>;
  async getWishes(idOrUsername: number | string): Promise<Wish[]> {
    const where = typeof idOrUsername === 'number' ? { id: idOrUsername } : { username: idOrUsername };

    const user = await this.UsersRepository.findOne({
      where,
      relations: {
        wishes: {
          offers: {
            user: true,
          },
          owner: true,
        },
      },
    });

    return checkHasEntity(user, ERROR_MESSAGES.USER_NOT_FOUND).wishes;
  }

  async remove(id: number) {
    const result = await this.UsersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    return {};
  }
}
