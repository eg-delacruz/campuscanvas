//Route secured as shown in https://www.youtube.com/watch?v=cOgogGJ6_7M&t=36s  (min 56)
//Session
import { getSession } from 'next-auth/react';

//Response manager
import { successResponse, errorResponse } from '@server/response';
import Controller from '@server/components/user/controller';

//Avoids CORS errors
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
  //Securing page with session
  const session = await getSession({ req });
  if (!session) {
    return errorResponse(req, res, 'Forbidden', 403, '[Network] No hay sesión');
  }

  //Avoiding CORS errors
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  const { body, method } = req;

  //GET req Not being used atm, since next-auth gets the user from the session after login.
  //To use it, we pass the id through the query of a GET request
  switch (method) {
    case 'GET':
      try {
        const id = req.query.update;
        const user = await Controller.getUserById(id);
        const cleanUser = Controller.cleanUserForClient(user);
        successResponse(req, res, cleanUser, 201);
      } catch (error) {
        errorResponse(req, res, 'Usuario no encontrado', 400, error);
      }
      break;

    //Update student data
    case 'PATCH':
      try {
        const updatedUser = await Controller.updateStuData(body);
        console.log(`[Network] ${updatedUser.name} updated successfully`);
        successResponse(req, res, 'Operación realizada con éxito', 200);
      } catch (error) {
        errorResponse(req, res, 'Error al actualizar datos', 400, error);
      }
      break;
    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
