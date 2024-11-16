import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BlogsModule } from './blogs/blogs.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BlogsResolver } from './blogs/blogs.resolver';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    UsersModule,
    BlogsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql', // Automatically generate the schema file
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
