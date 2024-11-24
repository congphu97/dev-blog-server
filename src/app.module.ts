import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BlogsModule } from './blogs/blogs.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BlogsResolver } from './blogs/blogs.resolver';
import { FirebaseModule } from './firebase/firebase.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    UsersModule,
    BlogsModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql', // Automatically generate the schema file,
      cors: {
        origin: '*', // Replace with the frontend URL
        credentials: true, // Allow cookies to be sent if necessary
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true, // This makes the ConfigModule available globally
      envFilePath: '.env', // Specify the path to your .env file
    })

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
