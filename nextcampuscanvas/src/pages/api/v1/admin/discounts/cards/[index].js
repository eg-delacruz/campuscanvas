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

  //Get home slider banners info for admin
  switch (method) {
    case 'GET':
      const { required_info } = req.headers;
      try {
        switch (required_info) {
          case 'home_sections_cards_count':
            const home_sections_count =
              await Controller.getHomeSectionsCardsCount();
            successResponse(req, res, home_sections_count, 201);
            break;

          case 'show_first_in_category_count':
            const show_first_in_category_count =
              await Controller.getShowFirstInCategoryCount();
            successResponse(req, res, show_first_in_category_count, 201);
            break;

          case 'show_first_in_all_discounts_count':
            const show_first_in_all_discounts_count =
              await Controller.getShowFirstInAllDiscountsCount();
            successResponse(
              req,
              res,
              { show_first_in_all_discounts_count },
              201
            );
            break;

          //Get all cards (available and unavailable) for the default case
          default:
            break;
        }
      } catch (error) {
        errorResponse(
          req,
          res,
          'Error al traer información de las cartas de descuento',
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
