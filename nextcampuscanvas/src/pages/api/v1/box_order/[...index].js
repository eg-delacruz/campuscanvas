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
    //Check if user is allowed to create an order
    case 'GET':
      try {
        const userID = req.query.index[0];
        const account_email = req.query.index[1];
        const stu_id = req.query.index[2];
        const stu_email = req.query.index[3];
        const university = session.token.stu_data.university;
        const isAllowedToOrder = await Controller.verifyBoxOrderLimit(
          userID,
          account_email,
          stu_id,
          stu_email,
          university
        );
        successResponse(req, res, { allowToOrder: isAllowedToOrder }, 200);
      } catch (error) {
        errorResponse(req, res, 'Ha habido un problema', 400, error);
      }
      break;

    //TODO:
    //Create a POST request to create orders without using payment gateway
    //But pickup in store. This needs to be accessed by the admin area only (validate it).
    //To generate the order number, generate a date and eliminate its hyphens, convert it
    //to string and only leave the date + hour, mins, secs.
    //A total paid ponerlo en 0.00 y status_URL: 'Recogida sin pasarela de pagos',
    //ambos created at serán el mismo
    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
