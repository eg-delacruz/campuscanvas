//Route secured as shown in https://www.youtube.com/watch?v=cOgogGJ6_7M&t=36s  (min 56)
//Session
import { getSession } from 'next-auth/react';

//Response manager
import { successResponse, errorResponse } from '@server/response';

//Avoids CORS errors
import NextCors from 'nextjs-cors';

import Controller from '@server/components/user/controller';

export default async function handler(req, res) {
  //Securing page with session
  const session = await getSession({ req });
  if (!session) {
    return errorResponse(req, res, 'Forbidden', 403, '[Network] No hay sesión');
  }

  //Securing route only for master admin!
  if (session) {
    if (!(session?.token.role === 'super_admin')) {
      return errorResponse(
        req,
        res,
        'Forbidden',
        403,
        '[Network] Usuario no autorizado'
      );
    }
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
    //Create new admin
    case 'POST':
      try {
        const master_id = req.body.userId;
        const new_admin_email = req.body.admin_email;
        const master_password = req.body.password;
        await Controller.createAdmin(
          master_id,
          new_admin_email,
          master_password
        );
        successResponse(req, res, 'Nuevo admin creado', 200);
      } catch (error) {
        errorResponse(
          req,
          res,
          'Hubo un error al generar cuenta admin',
          400,
          error
        );
      }
      break;

    //Get all admins
    case 'GET':
      break;

    case 'DELETE':
      try {
        const master_id = req.body.userId;
        const to_revoke_admin_email = req.body.admin_email;
        const master_password = req.body.password;
        await Controller.revokeAdmin(
          master_id,
          to_revoke_admin_email,
          master_password
        );
        successResponse(req, res, 'Admin destituido', 200);
      } catch (error) {
        errorResponse(req, res, 'Hubo un error al destituir admin', 400, error);
      }
      break;

    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
