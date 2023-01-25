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

  //GET discounts according to requirements
  switch (method) {
    case 'GET':
      const { required_cards } = req.headers;
      if (!required_cards) {
        return errorResponse(
          req,
          res,
          'No se recibió el parámetro requerido',
          400,
          'No se recibió el parámetro requerido'
        );
      }

      try {
        switch (required_cards) {
          //Get all available discount cards
          case 'all_available':
            const cards = await Controller.getAllAvailableDiscountCards();
            successResponse(req, res, cards, 201);
            break;

          default:
            errorResponse(
              req,
              res,
              'Parámetro no soportado',
              400,
              'Parámetro no soportado'
            );
            break;
        }
      } catch (error) {
        errorResponse(req, res, 'Error al obtener datos', 400, error);
      }
      break;

    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
