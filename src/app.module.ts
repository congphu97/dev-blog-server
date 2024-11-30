import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BlogsModule } from './blogs/blogs.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
@Module({
  imports: [
    UsersModule,
    BlogsModule,
    AuthModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql', // Automatically generate the schema file,
      playground: true,
      introspection: true,
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
