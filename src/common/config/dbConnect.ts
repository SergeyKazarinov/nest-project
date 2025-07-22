import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Offer } from '@/modules/offers/entities/offer.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Wish } from '@/modules/wishes/entities/wish.entity';
import { Wishlist } from '@/modules/wishlists/entities/wishlist.entity';

export const dbConnectConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: configService.get<string>('database.type') as 'postgres',
  host: configService.get<string>('database.host'),
  port: configService.get<number>('database.port'),
  username: configService.get<string>('database.username'),
  password: configService.get<string>('database.password'),
  database: configService.get<string>('database.database'),
  synchronize: configService.get<boolean>('isDev'),
  entities: [User, Wish, Offer, Wishlist],
});
