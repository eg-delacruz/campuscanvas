//Response manager
import { successResponse, errorResponse } from '@server/response';
import Controller from '@server/components/user/controller';
import jwt from 'jsonwebtoken';

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

  switch (method) {
    //We veryfy token and if yes, we redirect user to the reset password page
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
          res
            .status(200)
            .redirect(
              clientEndPoints.user.resetPassword(id, token, payload.email)
            );
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
          //Verify token and get its payload
          const payload = jwt.verify(token, secret);

          const modifiedUser = await Controller.resetPassword(
            newPassword,
            user
          );
          console.log(
            `[NETWORK] Contraseña de ${modifiedUser.email} reestablecida`
          );
          successResponse(req, res, 'Operación realizada con éxito', 200);
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
