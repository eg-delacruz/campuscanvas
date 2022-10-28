//https://github.com/hoangvvo/next-connect (next-connect library documentation)
import multer from 'multer';

//Session
import { getSession } from 'next-auth/react';

//Middleware to add other middlewares easier (like multer)
import { createRouter, expressWrapper } from 'next-connect';

//Response manager
import { successResponse, errorResponse } from '@server/response';

//Get request IP Address
import requestIp from 'request-ip';

//Avoids CORS errors
import NextCors from 'nextjs-cors';

//TODO: continue with help of this blog: https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430
//TODO: continue with help of https://www.youtube.com/watch?v=jwp4U6v-3h4&list=WL&index=6&t=484s
//TODO:Don´t forget to implement FB Conversions API in server
//TODO: send email after validation and redirect student to
//auth/cuenta_verificada , say something like "haz click en el enlace para que la validación se efectúe correctamente" so that
//session closes and user has to login again
//TODO: also send email in case student cannot be validated

//For file naming:
const generate_random_8_digits_id = () => {
  return Math.floor(10000000 + Math.random() * 90000000);
};
const date_ISO8601 = new Date().toISOString().split('T')[0]; //For file naming

//Multer middleware (start)
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    const { originalname } = file;
    callback(
      null,
      `${date_ISO8601}-${generate_random_8_digits_id()}-${originalname}`
    );
  },
});
const upload = multer({ storage, limits: { fileSize: 4194304, files: 1 } });
//Multer middleware (end)

const router = createRouter();
router
  //.use function used for multiple things
  .use(async (req, res, next) => {
    //Securing route with headers secret key
    if (
      req.headers.app_secret_key !=
      process.env.NEXT_PUBLIC_MAIN_NEXT_WEB_APP_SECRET_KEY
    ) {
      return errorResponse(req, res, 'Forbidden', 403, 'Forbidden user');
    }

    //Securing page with session
    const session = await getSession({ req });
    if (!session) {
      return errorResponse(
        req,
        res,
        'Forbidden',
        403,
        '[Network] No hay sesión'
      );
    }

    //Avoiding CORS errors
    await NextCors(req, res, {
      // Options
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
      optionsSuccessStatus: 200,
    });

    //Measures execution time (optional)
    const start = Date.now();
    await next(); // call next in chain
    const end = Date.now();
    console.log(`Request took ${end - start}ms`);
  })

  //POST:Uploading student id files
  //.array -> Allows multiple files
  //second parameter -> maximum file number
  .post(expressWrapper(upload.array('files', 2)), async (req, res) => {
    //req.files has info of the file thanks to multer
    const { body, method, files } = req;
    const session = await getSession({ req });

    try {
      const user_acc_id = session.token.sub;
      const email_acc = session.token.email;

      successResponse(req, res, 'Todo increiblísimo', 201);
    } catch (error) {
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
