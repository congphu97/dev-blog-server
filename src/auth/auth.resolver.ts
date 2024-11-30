import { Resolver, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { GitHubGuard } from './auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  @UseGuards(GitHubGuard)
  async githubLogin() {
    // This method will trigger the GitHub OAuth flow
    return 'Redirecting to GitHub for authentication...';
  }

  @Mutation(() => String)
  @UseGuards(GitHubGuard)
  async githubLoginCallback() {
    // After GitHub successfully redirects here, process the user profile
    return 'GitHub login successful!';
  }
}
