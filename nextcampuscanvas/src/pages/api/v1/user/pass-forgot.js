//Response manager
import { successResponse, errorResponse } from '@server/response';
import Controller from '@server/components/user/controller';
import jwt from 'jsonwebtoken';
import resetPassEmailLink from '@server/services/mailer/resetPassLink';
const { sendMail } = resetPassEmailLink;

//Avoids CORS errors
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  const { method } = req;

  switch (method) {
    //Generating and sending unique link to reset password
    case 'POST':
      try {
        const user = await Controller.getUserByEmail(req.body.email);

        //Creating one time link valid for 15 min
        const secret = process.env.JWT_SECRET + user.password;
        //We send these data in the token to receive it back
        //after user clicks on link to procees with the reset
        const payload = {
          email: user.email,
          id: user.id,
        };
        //We put the payload in the token
        const token = jwt.sign(payload, secret, { expiresIn: '15m' });
        //TODO: change this to production URL when uploading to server
        const link = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_URL_VERSION}/user/pass_reset/${user.id}/${token}`;

        //Sending email with link
        sendMail(user.email, link)
          .then((result) => {
            console.log('Email sent...', result);
          })
          .catch((error) => {
            console.log('Error sending email...', error);
          });

        console.log(link);
        successResponse(
          req,
          res,
          'El enlace para reestablecer tu contraseña ha sido enviado a tu email',
          200
        );
      } catch (error) {
        errorResponse(req, res, error.message, 400, error);
      }

      break;
    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
