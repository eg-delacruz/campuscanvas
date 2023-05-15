import routeRevalidator from '@server/services/routeRevalidator';

//Response manager
import { successResponse, errorResponse } from '@server/response';

//Middlewares
import { initializeEnpoint } from '@server/middlewares/initializeEndpoint';

//Endpoint to manually revalidate routes
export default async function handler(req, res) {
  //Initializing Endpoing
  const { status, session } = await initializeEnpoint(req, res, {
    secureWithSecretApiKey: true,
    secureWithSession: {
      secure: true,
      adminsOnly: true,
      allowedAdmins: 'master',
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

  const { method, body } = req;

  //Revalidate routes. Only reveive a single route in the body as a string
  switch (method) {
    case 'POST':
      const route = body.route;

      if (!route) {
        return errorResponse(
          req,
          res,
          'Ruta no especificada',
          400,
          'Ruta no especificada'
        );
      }

      await routeRevalidator(res, [route]);

      successResponse(req, res, 'Ruta revalidada', 200);
      break;

    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
