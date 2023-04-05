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

  const { body, method } = req;

  //GET discount by id
  switch (method) {
    case 'GET':
      const id = req.query.id;

      try {
        const discount = await Controller.getDiscountById(id);
        successResponse(req, res, discount, 201);
      } catch (error) {
        if (
          error.message === 'Descuento no encontrado' ||
          error.message.includes('Cast to ObjectId failed')
        ) {
          return errorResponse(req, res, 'Descuento no encontrado', 404, error);
        }
        errorResponse(req, res, 'Error al obtener datos', 400, error);
      }
      break;

    //Store likes and dislikes
    case 'PATCH':
      try {
        await Controller.countLikesDislikes(body);
        successResponse(req, res, 'Se ha almacenado la valoración', 201);
      } catch (error) {
        errorResponse(
          req,
          res,
          'Error al actualizar likes y dislikes',
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
