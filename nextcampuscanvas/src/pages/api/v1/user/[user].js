//Response manager
import { successResponse, errorResponse } from '@server/response';
import Controller from '@server/components/user/controller';

//Avoids CORS errors
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  const {
    query: { user: id },
    method,
  } = req;

  //TODO: Comprobar si pedir este user por query o por params (lectura en agenda)
  switch (method) {
    case 'GET':
      try {
        const user = await Controller.getUser(id);
        successResponse(req, res, user, 201);
      } catch (error) {
        errorResponse(req, res, 'Usuario no encontrado', 400, error);
      }

      break;
    //TODO: aquí irá ruta de modificar user (PATCH), la cual deberá recibir el id por req.query.id --> Ver curso node con mongo params vs query
    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
