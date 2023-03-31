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

  //GET discounts according to requirements
  switch (method) {
    case 'GET':
      const { required_cards, page, limit } = req.headers;

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
            const allCards = await Controller.getAllAvailableDiscountCards(
              page,
              limit
            );

            successResponse(req, res, allCards, 201);
            break;

          case 'fashion':
            const fashionCards =
              await Controller.getAvailableDiscountCardsByCategory(
                required_cards,
                page,
                limit
              );
            successResponse(req, res, fashionCards, 201);
            break;

          case 'travel':
            const travelCards =
              await Controller.getAvailableDiscountCardsByCategory(
                required_cards,
                page,
                limit
              );
            successResponse(req, res, travelCards, 201);
            break;

          case 'beauty':
            const beautyCards =
              await Controller.getAvailableDiscountCardsByCategory(
                required_cards,
                page,
                limit
              );
            successResponse(req, res, beautyCards, 201);
            break;

          case 'eatordrink':
            const eatordrinkCards =
              await Controller.getAvailableDiscountCardsByCategory(
                required_cards,
                page,
                limit
              );
            successResponse(req, res, eatordrinkCards, 201);
            break;

          case 'entertainment':
            const entertainmentCards =
              await Controller.getAvailableDiscountCardsByCategory(
                required_cards,
                page,
                limit
              );
            successResponse(req, res, entertainmentCards, 201);
            break;

          case 'technology':
            const technologyCards =
              await Controller.getAvailableDiscountCardsByCategory(
                required_cards,
                page,
                limit
              );
            successResponse(req, res, technologyCards, 201);
            break;

          case 'others':
            const othersCards =
              await Controller.getAvailableDiscountCardsByCategory(
                required_cards,
                page,
                limit
              );
            successResponse(req, res, othersCards, 201);
            break;

          case 'home_sections':
            const homeSectionsCards = await Controller.getHomeSectionsCards();
            successResponse(req, res, homeSectionsCards, 201);
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
