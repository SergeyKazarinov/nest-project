import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, ILike, Repository } from 'typeorm';

import { Wish } from '@/modules/wishes/entities/wish.entity';

import { ERROR_MESSAGES } from '@/common/consts/error';
import { checkHasEntity } from '@/common/utils/service/check-has-entity';
import { hashPassword } from '@/common/utils/service/hash-password';

import { PUBLIC_USER_PROFILE_SELECT } from './const/orm';
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
      throw new ConflictException(ERROR_MESSAGES.USER.ALREADY_EXISTS);
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

  async findUser(id: number, opt?: FindOneOptions<User>): Promise<User>;
  async findUser(username: string, opt?: FindOneOptions<User>): Promise<User>;
  async findUser(idOrUsername: number | string, opt?: FindOneOptions<User>): Promise<User> {
    const where = typeof idOrUsername === 'number' ? { id: idOrUsername } : { username: ILike(idOrUsername) };

    const options: FindOneOptions<User> = { where };

    if (typeof idOrUsername === 'string') {
      options.select = PUBLIC_USER_PROFILE_SELECT;
    }
    const user = await this.UsersRepository.findOne({ ...options, ...opt });

    return checkHasEntity(user, 'USER');
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserProfileResponseDto> {
    const user = await this.findUser(id);

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

    return checkHasEntity(user, 'USER').wishes;
  }

  async remove(id: number) {
    const result = await this.UsersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(ERROR_MESSAGES.USER.NOT_FOUND);
    }
    return {};
  }
}
