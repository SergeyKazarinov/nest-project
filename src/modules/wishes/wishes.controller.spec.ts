import { Test, TestingModule } from '@nestjs/testing';

import { WishesController } from './wishes.controller';
import { WishesService } from './wishes.service';

describe.skip('WishesController', () => {
  let controller: WishesController;

  const mockRepository = {
    create: jest.fn(() => ({})),
    findLast: jest.fn(),
    findTop: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    copy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WishesController],
      providers: [WishesService],
    })
      .overrideProvider(WishesService)
      .useValue(mockRepository)
      .compile();

    controller = module.get<WishesController>(WishesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create a Wish', () => {
    // const createWishDtoMock = {
    //   name: 'Test Wish',
    //   description: 'Test Description',
    //   link: 'https://example.com',
    //   image: 'https://example.com/image.jpg',
    //   price: 100.5,
    // };
    // expect(controller.create(createWishDtoMock)).toEqual({});
  });
});
