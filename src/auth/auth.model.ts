// user.interface.ts
export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    githubId?: string;
    accessToken?: string;
  }
  