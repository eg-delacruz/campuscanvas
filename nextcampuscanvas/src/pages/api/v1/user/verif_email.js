import { successResponse, errorResponse } from '@server/response';
import Controller from '@server/components/user/controller';

//Route secured as shown in https://www.youtube.com/watch?v=cOgogGJ6_7M&t=36s  (min 56)
//Session
import { getSession } from 'next-auth/react';

//Avoids CORS errors
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
  //Securing page with session
  const session = await getSession({ req });
  if (!session) {
    //TODO: uncomment this
    //return errorResponse(req, res, 'Forbidden', 403, '[Network] No hay sesión');
  }

  //Avoiding CORS errors
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  const { method, body } = req;

  switch (method) {
    //Verify student data and student email to generate and send verification email
    case 'POST':
      try {
        const id = body.id;
        const stu_email = body.stu_email;

        const user = await Controller.getUserById(id);

        const validationLink = await Controller.verifyStuEmail(user, stu_email);
        console.log(validationLink);
        //TODO: send email
        successResponse(
          req,
          res,
          'Se ha enviado un enlace a tu correo universitario',
          200
        );
      } catch (error) {
        //Al modificar errores, modificar en controller también
        if (
          error.message ===
          '[Controller] Este email ya ha sido utilizado para verificar una cuenta'
        ) {
          errorResponse(
            req,
            res,
            'Este email ya ha sido utilizado para verificar una cuenta',
            400,
            error.message
          );
          return false;
        }
        if (error.message === '[Controller] No has ingresado tu universidad') {
          errorResponse(
            req,
            res,
            'No has ingresado tu universidad',
            400,
            error.message
          );
          return false;
        }
        if (
          error.message === '[Controller] Ya has sido verificado anteriormente'
        ) {
          errorResponse(
            req,
            res,
            'Ya has sido verificado anteriormente',
            400,
            error.message
          );
          return false;
        }
        errorResponse(req, res, 'Error al verificar usuario', 400, error);
      }

      break;
    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
