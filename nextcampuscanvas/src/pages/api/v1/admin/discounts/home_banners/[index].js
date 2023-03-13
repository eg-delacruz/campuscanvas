//Response manager
import { successResponse, errorResponse } from '@server/response';
import Controller from '@server/components/discount/controller';
import routeRevalidator from '@server/services/routeRevalidator';
import multer from 'multer';

//Middlewares
import { initializeEnpoint } from '@server/middlewares/initializeEndpoint';
import { createRouter, expressWrapper } from 'next-connect';

//Multer middleware (start)
//MemoryStorage needed for AWS3 upload (instead of diskStorage)
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 4194304, files: 2 } });
const multiUpload = upload.fields([
  { name: 'big_home_slider_image', maxCount: 1 },
  { name: 'small_home_slider_image', maxCount: 1 },
]);
//Multer middleware (end)

//Session
let SESSION = null;

const router = createRouter();
router
  //.use function used for multiple things
  .use(async (req, res, next) => {
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

    if (session) SESSION = session;

    //Measures execution time (optional)
    const start = Date.now();
    await next(); // call next in chain
    const end = Date.now();
    console.log(`Request took ${end - start}ms`);
  })
  //Create home slider banner
  .post(expressWrapper(multiUpload), async (req, res) => {
    const { body, headers, method, files } = req;

    const { discount_id, available_for, affiliate_link, type } = body;
    const { big_home_slider_image } = files;
    const { small_home_slider_image } = files;
    const created_by = SESSION.session.user.email;

    try {
      const routesToUpdateSSG = await Controller.createHomeSliderBanner(
        discount_id,
        big_home_slider_image,
        small_home_slider_image,
        available_for,
        affiliate_link,
        type,
        created_by
      );

      //Revalidate SSG routes
      await routeRevalidator(res, routesToUpdateSSG);

      successResponse(req, res, 'Banner creado', 201);
    } catch (error) {
      if (error.message === 'Información insuficiente para crear banner') {
        return errorResponse(req, res, error.message, 400, error);
      }
      errorResponse(req, res, 'Error al crear banner', 400, error);
    }
  })
  //Get home slider banners info for admin
  .get(async (req, res) => {
    const { body, headers, method } = req;
    const { required_info } = headers;

    try {
      switch (required_info) {
        case 'banner_by_discount_id':
          const discount_id = req.query.index;
          const banner_info = await Controller.getHomeSliderBannerByDiscountId(
            discount_id
          );
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
  })
  //Delete home slider banner
  .delete(async (req, res) => {
    const { body, headers, method } = req;

    const banner_id = req.query.index;
    const slider_banner_big_screen_name = headers.slider_banner_big_screen_name;
    const slider_banner_small_screen_name =
      headers.slider_banner_small_screen_name;

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
  });

// Custom onError and onNoMatch handler
export default router.handler({
  onError: (error, req, res) => {
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return errorResponse(
          req,
          res,
          'El archivo es demasiado grande',
          413,
          'El archivo es demasiado grande'
        );
      }
      if (error.code === 'LIMIT_FILE_COUNT') {
        return errorResponse(
          req,
          res,
          'Límite de archivos alcanzado',
          413,
          'Límite de archivos alcanzado'
        );
      }
    }
    errorResponse(
      req,
      res,
      'Algo salió mal, inténtalo más tarde',
      500,
      'Algo salió mal, inténtalo más tarde'
    );
  },
  onNoMatch: (req, res) => {
    errorResponse(req, res, 'Método no soportado', 400, 'Método no soportado');
  },
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
