import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAuthGuard } from '@/modules/auth/guard/jwt-guard';

import { Wish } from './entities/wish.entity';
import { WishesController } from './wishes.controller';
import { WishesService } from './wishes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wish])],
  controllers: [WishesController],
  providers: [
    WishesService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class WishesModule {}
