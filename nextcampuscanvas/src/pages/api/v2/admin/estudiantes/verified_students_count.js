import Controller from '@server/components/user/controller';

//Response manager
import { successResponse, errorResponse } from '@server/response';

//Middlewares
import { initializeEnpoint } from '@server/middlewares/initializeEndpoint';

export default async function handler(req, res) {
  //Initializing Endpoing
  const { status, session } = await initializeEnpoint(req, res, {
    secureWithSecretApiKey: true,
    secureWithSession: {
      secure: true,
      adminsOnly: true,
      allowedAdmins: 'all',
    },
    avoidCorsErrors: true,
  });

  if (status.error) {
    return errorResponse(
      req,
      res,
      status.clientErrorMessage,
      403,
      status.serverErrorMessage
    );
  }

  const { body, method } = req;

  switch (method) {
    case 'GET':
      const { required_info } = req.headers;

      try {
        switch (required_info) {
          //Returns true/false
          case 'verified_students_count':
            const verified_students_count =
              await Controller.getVerifiedStudentsCount();
            successResponse(req, res, verified_students_count, 201);
            break;

          default:
            errorResponse(
              req,
              res,
              'Debes especificar la información requerida',
              400
            );
        }
      } catch (error) {
        errorResponse(
          req,
          res,
          'Hubo un error al obtener la información solicitada',
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
