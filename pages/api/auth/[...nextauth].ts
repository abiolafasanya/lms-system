import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import GithubProvider from 'next-auth/providers/github';
import CredentialProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { AuthController } from 'helper/authController';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // OAuth authentication providers...
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'name@gmail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user = await prisma.user
          .findFirst({
            where: { email: email },
          })
          .then((user) => {
            if (!user) throw new Error('User not found');
            const isMatch = AuthController.bcrypt.compareSync(
              password,
              user.password as string
            );
            if (!isMatch) throw new Error('Incorrect password');
            user.name = user.username;
            return user;
          })
          .catch((error) => {
            throw new Error(error);
          })
          .finally(async () => await prisma.$disconnect());
        return user;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    EmailProvider({
      server: {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: 'NextAuth.js <harbiola78@gmail.com>',
    }),
  ],

  pages: {
    signIn: '/auth/login', // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // jwt: true,
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 1 * 1 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 1 * 60 * 60, // 24 hours
  },
  jwt: {
    // A secret to use for key generation - you should set this explicitly
    // Defaults to NextAuth.js secret.
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 1 * 1, // 30 days
    // Set to true to use encryption (default: false)
    // encryption: true,

    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, key, token, maxAge }) => {},
    // decode: async ({ secret, key, token, maxAge }) => {},
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      const db = await prisma.user.findFirst({
        where: { email: session?.user.email as string },
      });
      const role = db?.role;
      session.user.role = role;
      session.user.id = db?.id;
      
      await prisma.$disconnect();
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
};

export default NextAuth(options);
