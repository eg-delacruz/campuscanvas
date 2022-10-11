//Response manager
import { successResponse, errorResponse } from '@server/response';
import Controller from '@server/components/user/controller';

//Avoids CORS errors
import NextCors from 'nextjs-cors';

//Get request IP Address
import requestIp from 'request-ip';

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  const { method } = req;

  switch (method) {
    //Register a new user. Only POST method is allowed in this file.
    case 'POST':
      try {
        const IP_Address = requestIp.getClientIp(req);
        const newUser = await Controller.registerUser(
          req.body.email,
          req.body.password,
          req.body.newsletter,
          IP_Address,
          req.body.browserName
        );
        //before passing user, password is deleted
        let user = newUser.toObject();
        delete user.password;

        successResponse(req, res, user, 201);
      } catch (error) {
        if (error.message?.includes('duplicate key')) {
          errorResponse(
            req,
            res,
            //If this message is modified, it must be modifies in
            //EmailPasswordForm.jsx and authActions.js in the front as well!!
            'Este email ya ha sido registrado, inicia sesión o recupera tu contraseña.',
            400,
            error
          );
        } else if (error.message === 'Los datos son incorrectos') {
          errorResponse(req, res, 'Los datos son incorrectos', 422, error);
        } else {
          errorResponse(req, res, 'Mensaje interno del servidor', 400, error);
        }
      }

      break;
    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
