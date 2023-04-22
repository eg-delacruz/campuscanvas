//Response manager
import { successResponse, errorResponse } from '@server/response';
import Controller from '@server/components/discount/controller';

//Middlewares
import { initializeEnpoint } from '@server/middlewares/initializeEndpoint';

export default async function handler(req, res) {
  //Initializing Endpoing
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

  //GET card by discount id
  switch (method) {
    case 'GET':
      const { page, limit } = req.headers;
      const { query } = req.query;

      try {
        const miniCardsSearchbarResults =
          await Controller.getMiniCardsSearchbarResults(query, page, limit);

        successResponse(req, res, miniCardsSearchbarResults, 200);
      } catch (error) {
        errorResponse(req, res, 'Error al obtener datos', 400, error);
      }
      break;

    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
