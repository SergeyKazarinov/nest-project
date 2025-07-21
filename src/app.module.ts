import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envConfig } from '@/common/config/envConfig';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot({ load: [envConfig] })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
