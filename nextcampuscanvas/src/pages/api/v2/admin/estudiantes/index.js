import unhandled_emails_Controller from '@server/components/unhandledEmails/controller';
import user_controller from '@server/components/user/controller';

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
          case 'unhandled_stu_emails':
            const unhandled_emails =
              await unhandled_emails_Controller.getAllUnhandledEmails();

            successResponse(req, res, unhandled_emails, 201);
            break;

          case 'verified_students':
            const verified_students_page = req.headers.page;
            const verified_students_limit = req.headers.limit;

            const verified_students_data =
              await user_controller.getVerifiedStudents(
                verified_students_page,
                verified_students_limit
              );

            successResponse(req, res, verified_students_data, 201);
            break;

          default:
            errorResponse(
              req,
              res,
              'Debes especificar la información requerida o la información solicitada no está disponible',
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
