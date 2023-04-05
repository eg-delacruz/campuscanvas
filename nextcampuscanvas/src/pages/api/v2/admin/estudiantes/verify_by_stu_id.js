import pending_stu_id_acc_validation_Controller from '@server/components/pending_stu_id_acc_validation/controller';

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
          case 'check_if_pending_validations_available':
            const available_pending_validations =
              await pending_stu_id_acc_validation_Controller.getPendingValidationsAvailavility();
            successResponse(req, res, available_pending_validations, 201);
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
