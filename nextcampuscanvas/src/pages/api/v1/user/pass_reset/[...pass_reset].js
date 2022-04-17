//Response manager
import { successResponse, errorResponse } from '@server/response';
import Controller from '@server/components/user/controller';
import jwt from 'jsonwebtoken';

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
    //We veryfy token and if yes, we send link to email to change password
    case 'GET':
      try {
        const id = req.query.pass_reset[0];
        const token = req.query.pass_reset[1];

        const user = await Controller.getUserById(id);

        //We create the same secret as in the pass-forgot route
        const secret = process.env.JWT_SECRET + user.password;
        try {
          const payload = jwt.verify(token, secret);

          //If the token is valid, we send the user to the page to reset the password
          res.status(200).redirect(
            //TODO: change URL when sending to production
            `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password/${id}/${token}/${user.email}`
          );

          console.log(payload);
        } catch (error) {
          errorResponse(
            req,
            res,
            'El enlace para reestablecer tu contraseña ha expirado',
            400,
            error
          );
        }
      } catch (error) {
        errorResponse(req, res, error.message, 400, error);
      }
      break;

    case 'POST':
      try {
        const id = req.query.pass_reset[0];
        const token = req.query.pass_reset[1];
        const newPassword = req.body.password;

        const user = await Controller.getUserById(id);

        //Validating token
        const secret = process.env.JWT_SECRET + user.password;

        try {
          //We get the payload of the token here
          const payload = jwt.verify(token, secret);
          const changePassword = await Controller.resetPassword(
            payload.id,
            newPassword
          );
          //TODO: cambiar response
          successResponse(req, res, changePassword, 200);
        } catch (error) {
          errorResponse(
            req,
            res,
            'El enlace ha expirado, error de verificación',
            400,
            error
          );
        }
      } catch (error) {
        errorResponse(
          req,
          res,
          'Ha habido un problema al modificar tu contraseña.',
          400,
          error
        );
      }
      break;
    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
