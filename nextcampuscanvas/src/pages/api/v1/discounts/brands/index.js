//Response manager
import { successResponse, errorResponse } from '@server/response';
import Controller from '@server/components/discount/controller';

//Middlewares
import { initializeEnpoint } from '@server/middlewares/initializeEndpoint';

export default async function handler(req, res) {
  //Initializing Endpoing
  //TODO: check if the avoid cors works in production
  const { status, session } = await initializeEnpoint(req, res, {
    secureWithSecretApiKey: true,
    secureWithSession: {
      secure: false,
      adminsOnly: false,
      allowedAdmins: '',
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

  //GET user info. Used to update header user name
  switch (method) {
    case 'GET':
      try {
        const brands = await Controller.getBrands();
        successResponse(req, res, brands, 201);
      } catch (error) {
        errorResponse(req, res, 'Error al obtener datos', 400, error);
      }
      break;

    //Save/update student data
    //Always needs to receive the website location to proceed

    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
