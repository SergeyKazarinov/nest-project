import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OffersModule } from '@/modules/offers/offers.module';
import { UsersModule } from '@/modules/users/users.module';
import { WishesModule } from '@/modules/wishes/wishes.module';
import { WishlistsModule } from '@/modules/wishlists/wishlists.module';

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
