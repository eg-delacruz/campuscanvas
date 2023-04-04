//Response manager
import { successResponse, errorResponse } from '@server/response';

import User_Controller from '@server/components/user/controller';
import AdminSetting_Controller from '@server/components/admin/admin_settings/controller';

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

  switch (method) {
    //Get admin settings
    case 'GET':
      try {
        const userID = session.token.sub;
        const settings = await AdminSetting_Controller.getAdminSettings(userID);
        successResponse(req, res, settings, 200);
      } catch (error) {
        errorResponse(
          req,
          res,
          'Hubo un error al obtener los ajustes de administrador',
          400,
          error
        );
      }
      break;

    //Update admin settings
    case 'PATCH':
      const { settings_to_update, update_value } = body;

      if (!settings_to_update || !update_value) {
        return errorResponse(
          req,
          res,
          'No se recibió el parámetro requerido',
          400,
          'No se recibió el parámetro requerido'
        );
      }

      try {
        const userID = session.token.sub;
        const updated_settings =
          await AdminSetting_Controller.updateAdminSettings(
            userID,
            settings_to_update,
            update_value
          );

        successResponse(req, res, updated_settings, 200);
      } catch (error) {
        errorResponse(
          req,
          res,
          'Hubo un error al actualizar los ajustes de administrador',
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
