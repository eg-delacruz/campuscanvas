import Controller from '@server/components/box_order/controller';

//Session
import { getSession } from 'next-auth/react';

//Response manager
import { successResponse, errorResponse } from '@server/response';

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

  //Securing route with headers secret key
  if (
    req.headers.app_secret_key !=
    process.env.NEXT_PUBLIC_MAIN_NEXT_WEB_APP_SECRET_KEY
  ) {
    return errorResponse(req, res, 'Forbidden', 403, 'Forbidden user');
  }

  switch (method) {
    //Get orders of a user
    case 'GET':
      try {
        const userID = req.query.index;

        const orders = await Controller.getBoxOrdersByUser(userID);
        successResponse(req, res, orders, 200);
      } catch (error) {
        errorResponse(req, res, 'Error al traer tus pedidos', 400, error);
      }
      break;
  }
}
