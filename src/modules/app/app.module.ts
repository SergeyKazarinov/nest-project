import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from '@/modules/users';
import { WishesModule } from '@/modules/wishes';

import { envConfig } from '@/common/config/envConfig';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot({ load: [envConfig] }), UsersModule, WishesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
