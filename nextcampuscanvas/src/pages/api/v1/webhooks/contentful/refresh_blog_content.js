import routeRevalidator from '@server/services/routeRevalidator';

//Response manager
import { successResponse, errorResponse } from '@server/response';

//Middlewares
import { initializeEnpoint } from '@server/middlewares/initializeEndpoint';

//Endpoint to refresh blog content when publishing/editing/deleting in Contentful
export default async function handler(req, res) {
  //Initializing Endpoing
  const { status, session } = await initializeEnpoint(req, res, {
    secureWithSecretApiKey: false,
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

  const { method, body } = req;

  if (
    req.headers.contentful_webhooks_secret_key !==
    process.env.CONTENTFUL_WEBHOOKS_SECRET_KEY
  ) {
    return errorResponse(
      req,
      res,
      'Token de acceso no válido',
      401,
      'Token de acceso no válido'
    );
  }

  //Dynamica routes will only be revalidated when an entry is published. When an entry is unpublished or deleted, the route will have to be revalidated manually in the admin panel
  switch (method) {
    case 'POST':
      const slug = body['fields[slug][en-US]'];

      //Revalidate routes
      if (slug) {
        await routeRevalidator(res, [`/blog/${slug}`]);
      }
      await routeRevalidator(res, ['/blog']);

      successResponse(req, res, 'Blog content refreshed', 200);
      break;

    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
