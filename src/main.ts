import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const port = process.env.PORT || 3000; // Use Render's PORT or default to 3000

  // Swagger setup for REST APIs
  const options = new DocumentBuilder()
  .setTitle('GraphQL API Documentation')
  .setDescription('This is the API documentation for the GraphQL endpoints')
  .setVersion('1.0')
  .addTag('graphql')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    // origin: 'https://dev-blog-server-rgnj.onrender.com', // Allow requests from this origin
    origin: '*',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type, x-apollo-operation-name, apollo-require-preflight, Authorization',
    credentials: true,  // Allow cookies (if needed for authentication)
  });

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
