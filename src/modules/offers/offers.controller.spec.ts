import { Test, TestingModule } from '@nestjs/testing';

import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';

describe.skip('OffersController', () => {
  let controller: OffersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OffersController],
      providers: [OffersService],
    }).compile();

    controller = module.get<OffersController>(OffersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
