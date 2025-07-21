import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig, swaggerOptions } from './common/config/swagger';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, documentFactory, swaggerOptions);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
