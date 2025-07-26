import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Wish } from './entities/wish.entity';
import { WishesService } from './wishes.service';

describe.skip('WishesService', () => {
  let service: WishesService;

  const mockRepository = {
    create: jest.fn(),
    findLast: jest.fn(),
    findTop: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    copy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WishesService,
        {
          provide: getRepositoryToken(Wish),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<WishesService>(WishesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
