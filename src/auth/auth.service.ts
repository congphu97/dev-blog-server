import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(user: any) {
    // Here you could check if the user exists in your DB, or create one if not
    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.githubId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
