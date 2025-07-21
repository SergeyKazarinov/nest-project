import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('NestJS API')
  .setDescription('NestJS API description')
  .setVersion('1.0')
  .build();

export const swaggerOptions: SwaggerCustomOptions = {};
