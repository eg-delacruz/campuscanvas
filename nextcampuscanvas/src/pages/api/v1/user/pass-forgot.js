//Response manager
import { successResponse, errorResponse } from '@server/response';
import Controller from '@server/components/user/controller';
import jwt from 'jsonwebtoken';
import { sendResetPasswordMail } from '@server/services/mailer/CC_info@google';

//clientEndpoints
import clientEndPoints from '@server/clientEndPoints';

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

  //Securing route with headers secret key
  if (
    req.headers.app_secret_key !=
    process.env.NEXT_PUBLIC_MAIN_NEXT_WEB_APP_SECRET_KEY
  ) {
    return errorResponse(req, res, 'Forbidden', 403, 'Forbidden user');
  }

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

        const link = clientEndPoints.user.forgotPassword(user.id, token);

        //Sending email with link
        await sendResetPasswordMail(user.email, link)
          .then((result) => {
            console.log('[Network] Email enviado', result);
          })
          .catch((error) => {
            console.log('[Network] Error al enviar el email', error);
          });

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
