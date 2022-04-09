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
    case 'GET':
      try {
        const user = await Controller.getUser(req.body.email);
        successResponse(req, res, user, 201);
      } catch (error) {
        errorResponse(req, res, 'Usuario no encontrado', 400, error);
      }

      break;
    //TODO: aquí irá ruta de modificar user (PUT), la cual deberá recibir el id, aunque pensar si recibirlo por query y hacer otro archivo como ruta dinámica para las modificaciones
    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
