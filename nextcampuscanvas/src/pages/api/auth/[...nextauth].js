import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

//DB connection
import dbConnect from '@server/dbConnect';
import config from '@server/config';
dbConnect(config.dbURL);

//Model
import User from '@server/components/auth/model';

import { verifyPassword } from '@server/services/auth';
// TODO: asignar tiempo de expiración de sesión
export default NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 5, // 5 days
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const result = await User.findOne({
          email: credentials.email,
        });
        console.log('NEXTAUTH', result);

        if (!result) {
          console.log('Usuario no encontrado');
          throw new Error('Usuario no encontrado');
        }

        const checkPassword = await verifyPassword(
          credentials.password,
          result.password
        );

        if (!checkPassword) {
          console.log('Contraseña incorrecta');
          throw new Error('Contraseña incorrecta');
        }
        console.log('Login OK');
        //No estoy seguro de cómo acceder a esto en el front
        return result;
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
