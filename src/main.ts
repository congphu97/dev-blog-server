import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,  { cors: true });

  const port = process.env.PORT || 3000; // Use Render's PORT or default to 3000
  app.enableCors({
    // origin: 'https://dev-blog-server-rgnj.onrender.com', // Allow requests from this origin
    origin: '*',
    credentials: true, // Optional, depending on your setup
  });

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
