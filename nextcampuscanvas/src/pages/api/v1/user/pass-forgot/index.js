//Response manager
import { successResponse, errorResponse } from '@server/response';
import Controller from '@server/components/user/controller';
import jwt from 'jsonwebtoken';

//Avoids CORS errors
import NextCors from 'nextjs-cors';

//TODO: en caso de recibir un query, renombrar este archivo a [pass-forgot].js o [...pass-forgot].js

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  const {
    //query: { user: id },
    method,
  } = req;

  switch (method) {
    //Equeals to the GET forgot-password
    case 'GET':
      try {
        //const user = await Controller.getUser(id);
        //console.log(user);
        successResponse(req, res, 'Holi', 201);
      } catch (error) {
        errorResponse(req, res, 'Usuario no encontrado', 400, error);
      }

      break;

    case 'POST':
      try {
        //const newUser = await Controller.registerUser(
        //req.body.email,
        //req.body.password
        //);

        // let user = newUser.toObject();

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
