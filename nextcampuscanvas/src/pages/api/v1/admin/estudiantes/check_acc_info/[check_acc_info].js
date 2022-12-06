//TODO: create a patch route to validate an account if a person only shows in person its id.

//Session
import { getSession } from 'next-auth/react';

//Response manager
import { successResponse, errorResponse } from '@server/response';

import Controller from '@server/components/admin/estudiantes/controller';

//Avoids CORS errors
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
  //Securing page with session
  const session = await getSession({ req });
  // if (!session) {
  //   return errorResponse(req, res, 'Forbidden', 403, '[Network] No hay sesión');
  // }

  // //Securing route only for admins!
  // if (session) {
  //   if (
  //     !(
  //       session?.token.role === 'super_admin' || session?.token.role === 'admin'
  //     )
  //   ) {
  //     return errorResponse(
  //       req,
  //       res,
  //       'Forbidden',
  //       403,
  //       '[Network] Usuario no autorizado'
  //     );
  //   }
  // }

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
    //Get all student data by its account email
    case 'GET':
      try {
        const accEmail = req.query.check_acc_info;

        const CompleteUserInfo = await Controller.getAllUserDataByAccEmail(
          accEmail
        );
        successResponse(req, res, CompleteUserInfo, 200);
      } catch (error) {
        if (error.message === 'Error: Usuario no encontrado') {
          return errorResponse(req, res, 'Usuario no encontrado', 400, error);
        }
        if (
          error.message === 'Error: No tienes acceso a los datos de esta cuenta'
        ) {
          return errorResponse(
            req,
            res,
            'No tienes acceso a los datos de esta cuenta',
            400,
            error
          );
        }
        errorResponse(
          req,
          res,
          'Hubo un error al traer la información del usuario',
          400,
          error
        );
      }

      break;

    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
