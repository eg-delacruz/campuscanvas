import Controller from '@server/components/box_order/controller';

//Session
import { getSession } from 'next-auth/react';

//Response manager
import { successResponse, errorResponse } from '@server/response';

//Avoids CORS errors
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
  //TODO: uncomment this after finishing. Also try it with insomnia to see the error
  //Securing page with session
  //   const session = await getSession({ req });
  //   if (!session) {
  //     return errorResponse(req, res, 'Forbidden', 403, '[Network] No hay sesión');
  //   }

  //Avoiding CORS errors
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  const { body, method } = req;

  //GET user info. Used to update header user name
  switch (method) {
    case 'GET':
      try {
        const userID = req.query.index;
        const isAllowedToOrder = await Controller.verifyBoxOrderLimit(userID);
        successResponse(req, res, 'Éxito', 200);
      } catch (error) {
        errorResponse(req, res, 'Ha habido un problema', 400, error);
      }
      break;

    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
