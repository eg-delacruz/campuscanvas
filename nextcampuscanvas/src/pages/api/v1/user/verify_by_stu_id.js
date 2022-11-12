import pending_stu_id_acc_validation_Controller from '@server/components/pending_stu_id_acc_validation/controller';

//Session
import { getSession } from 'next-auth/react';

//Response manager
import { successResponse, errorResponse } from '@server/response';

//TODO: Use for FB Conv. API
//Get request IP Address
import requestIp from 'request-ip';

//Avoids CORS errors
import NextCors from 'nextjs-cors';
import controller from '@server/components/box_order/controller';

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

  //Securing route with headers secret key
  if (
    req.headers.app_secret_key !=
    process.env.NEXT_PUBLIC_MAIN_NEXT_WEB_APP_SECRET_KEY
  ) {
    return errorResponse(req, res, 'Forbidden', 403, 'Forbidden user');
  }

  switch (method) {
    case 'GET':
      try {
        //Check if there are pending validatins (returns true/false)
        if (req.headers.website_location === 'admin_estudiantes_index') {
          const pending_validations =
            await pending_stu_id_acc_validation_Controller.getPendingValidationsAvailavility();
          //Didn´t use response.js because it doesn´t let send a truthy/falsy response
          res.status(200).send({ error: '', body: pending_validations });
        }

        //Get 15 oldest pending validation accounts for manuel validation in client
        if (req.headers.website_location === 'admin_pending_validations') {
          const oldest_pending_stu_id_validations =
            await pending_stu_id_acc_validation_Controller.getOldestEntries();
          successResponse(req, res, oldest_pending_stu_id_validations, 200);
        }
      } catch (error) {
        errorResponse(
          req,
          res,
          'Hubo un error al traer las entradas',
          400,
          error
        );
      }
      break;
    case 'PATCH':
      //TODO: create patch rout that can handle verification by email (has to get the USER ID), and also handles directly by the user id
      //-> Before verification, check if user id has already been used for that uni
      //-> Crate a route to get user by its stu_id (stu_id and university needed!)(not in this network, but in the one to get user by ____)(not really needed by the patch, but for future implementations. Now, just the controller verification funcion needed)
      //-> Erase user from pending validations and from unverified stu acc collection

      try {
        //Use user Id and stu_id here
        successResponse(req, res, 'Todo Okii', 200);
      } catch (error) {
        errorResponse(req, res, 'Erroooor', 400, error);
      }
      break;
    case 'DELETE':
      //TODO: create Delete to handle rejected validations
      //->erase from pending validations,
      //erase its files in amazon and in stuidfiles collection
      // don´t erase from unverif stu acc collection
      try {
        successResponse(req, res, 'Todo Okii', 200);
      } catch (error) {
        errorResponse(req, res, 'Erroooor', 400, error);
      }
      break;

    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
