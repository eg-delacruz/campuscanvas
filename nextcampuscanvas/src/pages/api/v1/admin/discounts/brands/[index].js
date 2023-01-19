import multer from 'multer';
import Controller from '@server/components/discount/controller';

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
    //TODO: check if the avoid cors works in production
    const { status, session } = await initializeEnpoint(req, res, {
      secureWithSecretApiKey: true,
      secureWithSession: {
        secure: true,
        adminsOnly: true,
        allowedAdmins: 'all',
      },
      avoidCorsErrors: false,
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

    // console.log('body', body);
    // console.log('headers', headers);
    // console.log('method', method);
    // console.log('files', files);

    //TODO: use a created_by attribute in final object
    console.log('session', SESSION?.token.email);

    try {
      successResponse(req, res, 'Archivos subidos exitosamente', 201);
    } catch (error) {
      //TODO: send error if brand name already exists
      if (
        error.message ===
        'El usuario ya ha subido su identificación anteriormente.'
      ) {
        return errorResponse(
          req,
          res,
          'Ya has subido tu identificación anteriormente. Te notificaremos por Email cuando hayas sido verificado',
          400,
          error.message
        );
      }
      errorResponse(req, res, 'Error al almacenar archivos', 400, error);
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
