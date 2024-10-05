import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors'; // Change to default importaaaaa

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      credentials: true,
    }),
  );

  await app.listen(3001);
}
bootstrap();
