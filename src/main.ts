import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.get('applicationPort'));
  console.log(`Listening on port ${config.get('applicationPort')}`);
}
bootstrap();
