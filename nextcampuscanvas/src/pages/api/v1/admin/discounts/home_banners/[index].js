//Response manager
import { successResponse, errorResponse } from '@server/response';
import Controller from '@server/components/discount/controller';
import routeRevalidator from '@server/services/routeRevalidator';

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
          case 'banner_by_discount_id':
            const discount_id = req.query.index;
            const banner_info =
              await Controller.getHomeSliderBannerByDiscountId(discount_id);
            successResponse(req, res, banner_info, 201);
            break;

          //Returns the home slider banners together with the corresponding discount info
          default:
            const banners_info =
              await Controller.getHomeSliderBannersInfoForAdmin();
            successResponse(req, res, banners_info, 201);
            break;
        }
      } catch (error) {
        errorResponse(
          req,
          res,
          'Error al traer información de banners',
          400,
          error
        );
      }
      break;

    //Delete home slider banner
    case 'DELETE':
      const banner_id = req.query.index;
      const slider_banner_big_screen_name =
        req.headers.slider_banner_big_screen_name;
      const slider_banner_small_screen_name =
        req.headers.slider_banner_small_screen_name;

      try {
        const routesToUpdateSSG = await Controller.deleteHomeSliderBanner(
          banner_id,
          slider_banner_big_screen_name,
          slider_banner_small_screen_name
        );

        //Revalidate SSG routes
        await routeRevalidator(res, routesToUpdateSSG);

        successResponse(req, res, 'Se ha eliminado el banner', 201);
      } catch (error) {
        errorResponse(req, res, 'Error al eliminar banner', 400, error);
      }
      break;

    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
