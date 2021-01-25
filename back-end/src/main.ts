import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  
// 1
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(3000);
  
// 2
//   const app = await NestFactory.create(AppModule);
//   app.enableCors({
//             origin: true,
//             methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//             allowedHeaders: ['Content-Type', 'Authorization']
//             credentials: true,
//         });
//   await app.listen(3000);
}
bootstrap();
