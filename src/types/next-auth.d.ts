import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

// deklarasikan ulang tipe JWT
declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role?: string;
  }
}

// deklarasikan ulang tipe Session dan User
declare module 'next-auth' {
  interface Session {
    user?: {
      role?: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role?: string;
  }
}