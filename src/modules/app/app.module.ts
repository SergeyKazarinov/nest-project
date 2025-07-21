import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from '@/modules/users';

import { envConfig } from '@/common/config/envConfig';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot({ load: [envConfig] }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
