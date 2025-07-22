import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OffersModule } from '@/modules/offers';
import { UsersModule } from '@/modules/users';
import { WishesModule } from '@/modules/wishes';
import { WishlistsModule } from '@/modules/wishlists';

import { dbConnectConfig } from '@/common/config/dbConnect';
import { envConfig } from '@/common/config/envConfig';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [envConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: dbConnectConfig,
    }),
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
