import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { ConfigService } from '@nestjs/config'; // For managing environment variables
import axios from 'axios';

@Injectable()
export class GithubService extends PassportStrategy(Strategy, 'github') {
  constructor(private configService: ConfigService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,  // Ensure this is correct
      clientSecret: process.env.GITHUB_CLIENT_SECRET,  // Ensure this is correct
      callbackURL: 'http://localhost:3000/auth/github/callback',  // Ensure this is correct
      scope: ['user'], // You can add more scopes if necessary
    });
  }

  // This method is called when GitHub successfully authenticates the user
  async validate(accessToken: string, refreshToken: string, profile: any) {
    // You can handle user logic here (save user info to DB, etc.)
    return { accessToken, profile };
  }

  async validateToken(token: string) {
    try {
      // GitHub API endpoint to fetch user info using the access token
      const response = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // If the request is successful, the token is valid
      return response.data; // Return the user data fetched from GitHub
    } catch (error) {
      // If an error occurs (invalid token or other issues), return null or throw an error
      console.error('Error validating GitHub token:', error);
      return null;
    }
  }
}
