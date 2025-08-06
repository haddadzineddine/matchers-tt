import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig } from './configs/swagger.config';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerConfig(app);

  const configService = app.get(ConfigService);
  const port = configService.get('port');

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () => {
    Logger.log(`Server is running on port ${port}`, 'Bootstrap');
    Logger.log(`Swagger is running on http://localhost:${port}/api`, 'Bootstrap');
  });
}
bootstrap();
