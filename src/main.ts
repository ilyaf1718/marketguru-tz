import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('MarketGuru ТЗ')
    .setDescription('API docs')
    .setVersion('0.0.1')
    .build();
  const docs = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, docs);

  const PORT = process.env.PORT;
  await app.listen(PORT, () => {
    console.log(`Started on ${PORT}`);
  });
}
bootstrap();