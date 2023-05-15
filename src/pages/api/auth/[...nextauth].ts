import dbConnect from '@/lib/db.Connect';
import User from '@/models/user';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { compare } from 'bcrypt';
import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from '../../../lib/mongodb';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        await dbConnect().catch((err) => {
          throw new Error('Could not connect to database');
        });

        const user = await User.findOne({ email: credentials?.email }).select('+hashedPassword');

        if (!user) {
          throw new Error('Email not found');
        }

        const isPasswordCorrect = await compare(credentials!.password, user.hashedPassword);

        if (!isPasswordCorrect) {
          throw new Error('Password is incorrect');
        }

        return { email: user.email, name: user.name, image: user.image, id: user._id };
      },
    }),
  ],
  pages: {
    signIn: '/signup',
  },
  debug: process.env.NODE_ENV === 'development',
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  callbacks: {
    jwt: async ({ token, user }: { token: any; user: any }) => {
      if (user) token.user = user;
      return token;
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      const user = token.user;
      session.user = user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
