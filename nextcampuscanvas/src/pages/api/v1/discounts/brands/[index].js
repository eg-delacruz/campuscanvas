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

  //GET all brands
  switch (method) {
    case 'GET':
      const { required_info } = headers;

      if (!required_info) {
        return errorResponse(
          req,
          res,
          'No se recibió el parámetro requerido',
          400,
          'No se recibió el parámetro requerido'
        );
      }
      try {
        switch (required_info) {
          case 'all_brands':
            const allBrands = await Controller.getBrands();
            successResponse(req, res, allBrands, 201);
            break;

          case 'single_brand':
            const brandId = req.query.index;
            const singleBrand = await Controller.getBrandById(brandId);
            successResponse(req, res, singleBrand, 201);
            break;

          case 'brands_count':
            const brandsCount = await Controller.getBrandsCount();
            const COUNT = {
              count: brandsCount,
            };

            successResponse(req, res, COUNT, 201);
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
        if (error.message === 'No se ha encontrado la marca') {
          return errorResponse(req, res, error.message, 404, error);
        }
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
