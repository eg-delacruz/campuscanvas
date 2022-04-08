import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

//DB connection
import dbConnect from '@server/dbConnect';
import config from '@server/config';
dbConnect(config.dbURL);

//Model
import User from '@server/components/auth/model';

import { verifyPassword } from '@server/services/auth';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const result = await User.findOne({
          email: credentials.email,
        });
        console.log('Next auth', credentials);

        if (!result) {
          throw new Error('Usuario no encontrado');
        }

        const checkPassword = await verifyPassword(
          credentials.password,
          result.password
        );

        if (!checkPassword) {
          throw new Error('Contraseña incorrecta');
        }
        return { email: result.email };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      //first time jwt callback is run, user object is available
      if (user) {
        token.id = 'test_1';
      }
      return token;
    },
    session: (session, token) => {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  secret: 'test',
  jwt: {
    secret: 'test',
    encryption: true,
  },
  pages: {
    signIn: '/registro',
  },
});
