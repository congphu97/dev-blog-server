// import { Controller, Get, Req, UseGuards } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { GitHubGuard } from './auth.guard';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   // Initiates GitHub OAuth flow
//   @Get('github')
//   @UseGuards(GitHubGuard)
//   async githubLogin() {
//     // This is where the user is redirected to GitHub for OAuth login
//   }

//   // Callback URL where GitHub will redirect with the authorization code
//   @Get('github/callback')
//   @UseGuards(GitHubGuard)
//   async githubLoginCallback(@Req() req) {
//     // req.user contains the GitHub user and access token
//     const user = req.user;

//     // The access token is available from the user object
//     const accessToken = user.accessToken; // GitHub OAuth access token

//     return {
//       message: 'Authentication successful',
//       accessToken, // Send the access token to the frontend
//     };
//   }
// }
// src/auth/auth.controller.ts

import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { GithubService } from './strategy/github.strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly githubService: GithubService) {}

  // This route will redirect the user to GitHub OAuth
  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubLogin() {
    // Redirects to GitHub login page
  }

  // This route will handle the GitHub callback
  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  githubLoginCallback(@Req() req: Request, @Res() res: any) {
    // The user profile and token are available in req.user
    const user: any = req.user;
    const accessToken = user.accessToken;
    console.log(user)
    // Optionally, you can store the access token in a session or JWT
    res.redirect(`http://localhost:3001/auth/redirect?access_token=${accessToken}`);
  }

  @Get('github/validate')
  async validateGitHubToken(@Req() req: Request, @Res() res: any) {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from the Authorization header

    if (!token) {
      return res.status(400).json({ message: 'No token provided' });
    }

    const userData = await this.githubService.validateToken(token);

    if (userData) {
      return res.json(userData); // Return user data if the token is valid
    } else {
      return res.status(401).json({ message: 'Invalid or expired token' }); // Return error if token is invalid
    }
  }
}
