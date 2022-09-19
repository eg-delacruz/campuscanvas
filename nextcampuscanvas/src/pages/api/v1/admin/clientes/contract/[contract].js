//Route secured as shown in https://www.youtube.com/watch?v=cOgogGJ6_7M&t=36s  (min 56)
//Session
import { getSession } from 'next-auth/react';

//Response manager
import { successResponse, errorResponse } from '@server/response';

import Controller from '@server/components/admin/clientes/contract/controller';

//Avoids CORS errors
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
  //Securing page with session
  const session = await getSession({ req });
  if (!session) {
    return errorResponse(req, res, 'Forbidden', 403, '[Network] No hay sesión');
  }

  //Securing route only for admins!
  if (session) {
    if (
      !(
        session?.token.role === 'super_admin' || session?.token.role === 'admin'
      )
    ) {
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

  switch (method) {
    //PDF Contract - Generation and fetching of the data
    case 'POST':
      try {
        //This saves the pdf information in db, and returns the new contract number
        const contract_number = await Controller.generateContract(body);

        successResponse(req, res, contract_number, 200);
      } catch (error) {
        errorResponse(
          req,
          res,
          'Hubo un error al generar el contato',
          400,
          error
        );
      }

      break;

      break;
    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
