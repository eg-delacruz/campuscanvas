//TODO: Este archivo posiblemente se pueda eliminar y pasar lo que
//está aquí a v1/user/index. Hacerlo luego de haber hecho el
//get para un user con toda su estructura.

//Response manager
import { successResponse, errorResponse } from '@server/response';
import Controller from '@server/components/auth/controller';

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
    //Only POST method is allowed
    case 'POST':
      try {
        const newUser = await Controller.registerUser(
          req.body.email,
          req.body.password
        );
        //antes de pasar user borrar el password
        let user = newUser.toObject();
        delete user.password;

        successResponse(req, res, user, 201);
      } catch (error) {
        if (error.message?.includes('duplicate key')) {
          errorResponse(
            req,
            res,
            'Este email ya ha sido registrado anteriormente',
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
