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

  //Eliminate discount by id
  switch (method) {
    case 'DELETE':
      const id = req.query.id;
      console.log(id);

      try {
        //  await Controller.eliminateDiscount(id);
        successResponse(req, res, 'Descuento eliminado', 201);
      } catch (error) {
        if (error.message === 'Descuento no encontrado') {
          errorResponse(req, res, 'Descuento no encontrado', 404, error);
        }
        errorResponse(req, res, 'Error al eliminar descuento', 400, error);
      }
      break;

    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
