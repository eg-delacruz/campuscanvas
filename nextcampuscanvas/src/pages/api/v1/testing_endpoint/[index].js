//Route used for testing purposes. Don´t leave it with sensitive data
//and always secure it with Secret Key to secure routes
//in main Next Js WebApp

//Response manager
import { successResponse, errorResponse } from '@server/response';

//Avoids CORS errors
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
  //Avoiding CORS errors
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  const { method } = req;

  //Securing route with headers secret key
  if (
    req.headers.secret_key !=
    process.env.NEXT_PUBLIC_MAIN_NEXT_WEB_APP_SECRET_KEY
  ) {
    return errorResponse(req, res, 'Forbidden', 403, 'Forbidden user');
  }

  switch (method) {
    case 'POST':
      try {
        successResponse(req, res, 'Todo OK', 201);
      } catch (error) {
        errorResponse(req, res, 'Error', 400, error.message);
      }
      break;

    //REMEMBER: Delete works mostly with req.query!
    case 'DELETE':
      try {
        successResponse(req, res, 'Todo OK', 201);
      } catch (error) {}
      break;
    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
