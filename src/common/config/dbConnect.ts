import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Offer } from '@/modules/offers';
import { User } from '@/modules/users';
import { Wish } from '@/modules/wishes';
import { Wishlist } from '@/modules/wishlists';

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
