import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from '@/modules/app';

import { swaggerConfig, swaggerOptions } from '@/common/config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, documentFactory, swaggerOptions);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
