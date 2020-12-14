import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MySwaggerModule } from './common/modules/swagger.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // configurations
  MySwaggerModule.setupSwagger(app);
  await app.listen(process.env.PORT || 3300);
}
bootstrap();
