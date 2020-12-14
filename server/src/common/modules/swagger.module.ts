import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class MySwaggerModule {
  static setupSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
      .setTitle('19424002-Sakila')
      .setDescription('19424002-Sakila API Document')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }
}