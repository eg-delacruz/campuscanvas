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
import Controller from '@server/components/user/controller';

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

    //Manual verification of acc by uploaded student id file
    case 'PATCH':
      try {
        const userID = req.body.userID;
        const stu_id = req.body.stu_id;

        const validation = await Controller.manuallyVerifyStuAccByStuId(
          userID,
          stu_id
        );
        if (validation === 'Already verified') {
          errorResponse(
            req,
            res,
            'Esta cuenta ya ha sido verificada',
            400,
            'Already verified'
          );
          return false;
        }

        if (validation === 'Invalid ID') {
          errorResponse(
            req,
            res,
            'Este ID ya ha sido utilizado para esta universidad',
            400,
            'Invalid ID'
          );
          return false;
        }

        if (validation === 'Register step 2 missing') {
          errorResponse(
            req,
            res,
            'No se ha completado el paso 2 de verificación de la cuenta',
            400,
            'Register step 2 missing'
          );
          return false;
        }

        successResponse(req, res, 'Estudiante validado correctamente', 200);
      } catch (error) {
        errorResponse(
          req,
          res,
          'No se pudo validar, revisar datos de la cuenta',
          400,
          error
        );
      }
      break;
    case 'DELETE':
      //Handle rejected student ID validations
      try {
        const userID = req.query.id;
        const user_email = req.query.email;
        const reject_reason = req.query.reject_reason;

        await Controller.manuallyRejectAccVerifByStuId(
          userID,
          user_email,
          reject_reason
        );

        successResponse(req, res, 'Operación realizada con éxito', 200);
      } catch (error) {
        errorResponse(req, res, 'Erroooor', 400, error);
      }
      break;

    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
