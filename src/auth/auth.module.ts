import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GithubService } from './strategy/github.strategy';

@Module({
  imports: [JwtModule.register({ secret: '123123' }), PassportModule.register({ defaultStrategy: 'github' })],
  controllers: [AuthController],
  providers: [AuthService, GithubService],
})
export class AuthModule {}
