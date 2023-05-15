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
      try {
        const route = body.route;
        const allowed_route_domains = [
          'https://www.campuscanvas.net',
          'http://localhost:3000',
        ];

        if (!route) {
          return errorResponse(
            req,
            res,
            'Ruta no especificada',
            400,
            'Ruta no especificada'
          );
        }

        //Check if any of the allowed domains is in the route
        const allowed_domain = allowed_route_domains.find((domain) =>
          route.includes(domain)
        );

        if (!allowed_domain) {
          return errorResponse(
            req,
            res,
            'Ruta no permitida',
            400,
            'Ruta no permitida'
          );
        }

        //Remove the domain from the route
        const relative_route = route.replace(allowed_domain, '');

        //Revalidate route
        await res.revalidate(relative_route);

        successResponse(req, res, 'Ruta revalidada', 200);
      } catch (error) {
        console.log({ error });
        //Check if the error has the string 'Invalid response 404'
        if (error.message.includes('Invalid response 404')) {
          return errorResponse(req, res, 'Esta ruta no existe', 500, error);
        }
        errorResponse(
          req,
          res,
          'Hubo un problema al revalidar la ruta',
          500,
          error
        );
      }
      break;

    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
