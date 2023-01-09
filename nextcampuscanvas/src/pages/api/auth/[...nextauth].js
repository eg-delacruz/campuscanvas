import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

//DB connection
import dbConnect from '@server/dbConnect';
import config from '@server/config';
dbConnect(config.dbURL);

//Model
import User from '@server/components/user/model';

import { verifyPassword } from '@server/services/passEncript';

export default NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 2, // 2 days
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const result = await User.findOne({
          email: credentials.email,
        });

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
        return result;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      //The user we get after validation is available here with all its properties and we can pass all properties
      //needed to the token, which is available in the token object in the frontend
      if (user) {
        token.name = user.nickname;
        token.gender = user.gender;
        token.stu_verified = user.stu_verified;
        token.stu_data = user.stu_data;
        token.email = user.email;
        token.role = user.role;
        token.stu_id = user.stu_id;
        token.stu_email = user.stu_email;
        token.birthdate = user.birthdate;
        token.phone = user.phone;
        token.delivery_address = user.delivery_address;
      }
      return token;
    },
    //Session contains the token and some pre-defined properties of the user (name,email, imagae)
    //It also has the token with the user data we pass to it in the jwt callback
    session: (session, token) => {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  //Secret is a string that is used to sign the token
  //Only the server knows this secret
  secret: process.env.JWT_SECRET,
  //jwt
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  },
  // pages: {
  //   signIn: '/registro',
  // },
});
