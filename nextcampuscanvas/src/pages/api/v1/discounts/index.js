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

  const { body, method, headers } = req;

  //GET discounts according to required info
  switch (method) {
    case 'GET':
      if (!headers.needed_info) {
        return errorResponse(
          req,
          res,
          'Error al obtener datos',
          400,
          'Se necesita el header de needed_info'
        );
      }

      try {
        if (headers.needed_info) {
          switch (headers.needed_info) {
            //This includes availables and unavailables
            case 'all_discounts':
              const discounts = await Controller.getDiscounts();
              successResponse(req, res, discounts, 201);
              break;

            case 'home_data':
              const homeData = await Controller.getHomeData();
              successResponse(req, res, homeData, 201);
              break;
            case 'discounts_by_brand':
              const brandID = headers.brand_id;
              const discountsByBrand = await Controller.getDiscountsByBrand(
                brandID
              );
              successResponse(req, res, discountsByBrand, 201);
              break;
            case 'discounts_count_by_brand':
              const brandIDForCount = headers.brand_id;
              const discountsCountByBrand =
                await Controller.getDiscountsCountByBrandId(brandIDForCount);
              const COUNT = {
                count: discountsCountByBrand,
              };
              successResponse(req, res, COUNT, 201);
              break;
            default:
              errorResponse(
                req,
                res,
                'Error al obtener datos',
                400,
                'Ha habido un error, revise los headers pertinentes o el controlador'
              );
              break;
          }
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
