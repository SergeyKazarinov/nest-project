import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserDto } from './dto/create-user.dto';
import { CREATE_USER_DTO_MOCK, USER_PROFILE_MOCK } from './mock/user.mock';
import { UsersService } from './users.service';

const CONFLICT_ERROR_RESOLVE_MOCK = {
  message: 'Пользователь уже существует',
  error: 'Conflict',
  statusCode: 409,
};

describe('UsersService', () => {
  let service: UsersService;

  const mockRepository = {
    create: jest.fn((createUserDto: CreateUserDto) => {
      if (createUserDto.username === 'hasUsername' || createUserDto.email === 'hasEmail') {
        return CONFLICT_ERROR_RESOLVE_MOCK;
      }

      if (!createUserDto.about) {
        return {
          id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          ...createUserDto,
          about: USER_PROFILE_MOCK.about,
        };
      }
      return { id: 1, createdAt: new Date(), updatedAt: new Date(), ...createUserDto };
    }),

    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockRepository)
      .compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('create user success', async () => {
    const result = await service.create(CREATE_USER_DTO_MOCK);

    expect(mockRepository.create).toHaveBeenCalledWith(CREATE_USER_DTO_MOCK);
    expect(result).toMatchObject(CREATE_USER_DTO_MOCK);
    expect(result.id).toEqual(expect.any(Number));
    expect(result.createdAt).toEqual(expect.any(Date));
    expect(result.updatedAt).toEqual(expect.any(Date));
  });

  it('create user error. Already exists', async () => {
    const result = await service.create({ ...CREATE_USER_DTO_MOCK, username: 'hasUsername' });

    expect(result).toEqual(CONFLICT_ERROR_RESOLVE_MOCK);

    const resultWithEmail = await service.create({ ...CREATE_USER_DTO_MOCK, email: 'hasEmail' });

    expect(resultWithEmail).toEqual(CONFLICT_ERROR_RESOLVE_MOCK);
  });

  it('create user with default about', async () => {
    const result = await service.create({ ...CREATE_USER_DTO_MOCK, about: undefined });

    expect(result).toMatchObject({
      ...CREATE_USER_DTO_MOCK,
      about: USER_PROFILE_MOCK.about,
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
