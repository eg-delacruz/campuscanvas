//https://github.com/hoangvvo/next-connect (next-connect library documentation)
//https://www.youtube.com/watch?v=jwp4U6v-3h4&list=WL&index=6&t=484s (upload to AWS3 guide)

import multer from 'multer';
import Controller from '@server/components/discount/controller';
import routeRevalidator from '@server/services/routeRevalidator';

//Middleware to add other middlewares easier (like multer)
import { createRouter, expressWrapper } from 'next-connect';

//Response manager
import { successResponse, errorResponse } from '@server/response';

//Middlewares
import { initializeEnpoint } from '@server/middlewares/initializeEndpoint';

//Multer middleware (start)
//MemoryStorage needed for AWS3 upload (instead of diskStorage)
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 4194304, files: 2 } });
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

  //POST: Storing brand information
  //.array -> Allows multiple files
  .post(expressWrapper(upload.array('brand_logo')), async (req, res) => {
    //req.files has the files thanks to multer
    const { body, headers, method, files } = req;

    const data = {
      brand_name: body.brand_name,
      brand_logo: files,
      brand_slug: body.brand_slug,
      brand_home_tracked_url: body.brand_home_tracked_url,
      sponsors_box: body.sponsors_box,
      brand_description: body.brand_description,
      upper_headings: body.upper_headings,
      faqs: body.faqs,
      tab_title: body.tab_title,
      meta_name: body.meta_name,
      meta_description: body.meta_description,
      affiliate_program: body.affiliate_program,
      notes: body.notes,
      created_by: SESSION?.token.email,
    };

    try {
      const response = await Controller.createNewBrand(data);

      //Create route for the brand
      await routeRevalidator(res, response.routesToUpdateSSG);

      successResponse(
        req,
        res,
        { message: 'Marca creada exitosamente', brand: response.brand },
        201
      );
    } catch (error) {
      if (error.message === 'Información insuficiente para crear marca') {
        return errorResponse(
          req,
          res,
          'Información insuficiente para crear marca',
          400,
          error.message
        );
      }
      if (
        error.message === 'Esta marca ya ha sido creada, utiliza otro nombre'
      ) {
        return errorResponse(
          req,
          res,
          'Esta marca ya ha sido creada, utiliza otro nombre',
          400,
          error.message
        );
      }

      if (error.message === 'Este slug ya existe, utiliza otro') {
        return errorResponse(
          req,
          res,
          'Este slug ya existe, utiliza otro',
          400,
          error.message
        );
      }

      errorResponse(req, res, 'Error al crear marca', 400, error);
    }
  })
  //Updating brand info
  .patch(expressWrapper(upload.array('brand_logo')), async (req, res) => {
    const { body, headers, method, files } = req;

    //Update last time checked
    if (headers.required_info === 'update_last_time_checked') {
      const brand_id = headers.brand_id;
      try {
        const updated_date = await Controller.updateLastTimeCheckedDate(
          brand_id
        );
        successResponse(req, res, updated_date, 201);
      } catch (error) {
        errorResponse(req, res, 'Error al editar marca', 400, error);
      }
      return;
    }

    //Default case (update brand info)
    const data = {
      id: body.id,
      brand_logo: files,
      brand_slug: body.brand_slug,
      brand_home_tracked_url: body.brand_home_tracked_url,
      upper_headings: body.upper_headings,
      faqs: body.faqs,
      tab_title: body.tab_title,
      meta_name: body.meta_name,
      meta_description: body.meta_description,
      sponsors_box: body.sponsors_box,
      brand_description: body.brand_description,
      affiliate_program: body.affiliate_program,
      notes: body.notes,
      updated_by: SESSION?.token.email,
    };

    try {
      const result = await Controller.updateBrand(data);

      //Revalidate routes affected by the change
      await routeRevalidator(res, result.routesToUpdateSSG);

      successResponse(req, res, 'Marca editada exitosamente', 201);
    } catch (error) {
      errorResponse(req, res, 'Error al editar marca', 400, error);
    }
  })
  .delete(async (req, res) => {
    const { body, headers, method } = req;

    const brandID = req.query.index;
    const brandLogoFileName = headers.brandlogofilename;
    try {
      const routesToUpdateSSG = await Controller.deleteBrand(
        brandID,
        brandLogoFileName
      );

      //Revalidate routes affected by the change
      await routeRevalidator(res, routesToUpdateSSG);

      successResponse(req, res, 'Marca eliminada', 201);
    } catch (error) {
      if (
        error.message ===
        'No se puede eliminar marca porque tiene descuentos asociados'
      ) {
        return errorResponse(
          req,
          res,
          'No se puede eliminar marca porque tiene descuentos asociados',
          400,
          error
        );
      }
      errorResponse(req, res, 'Error al eliminar la marca', 400, error);
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
