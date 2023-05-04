//Response manager
import { successResponse, errorResponse } from '@server/response';

import Controller from '@server/components/user/controller';

//Middlewares
import { initializeEnpoint } from '@server/middlewares/initializeEndpoint';

export default async function handler(req, res) {
  //Initializing Endpoing
  const { status, session } = await initializeEnpoint(req, res, {
    secureWithSecretApiKey: true,
    secureWithSession: {
      secure: true,
      adminsOnly: false,
      allowedAdmins: 'master',
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

  switch (method) {
    //Create new admin
    case 'POST':
      try {
        const master_id = req.body.master_id;
        const new_admin_email = req.body.new_admin_email;
        const master_password = req.body.master_password;

        const created_admin = await Controller.createAdmin(
          master_id,
          new_admin_email,
          master_password
        );
        successResponse(
          req,
          res,
          {
            newAdmin: created_admin,
            message: 'Nuevo admin creado',
          },
          200
        );
      } catch (error) {
        errorResponse(
          req,
          res,
          'Hubo un error al generar cuenta admin',
          400,
          error
        );
      }
      break;

    //Get all admins
    case 'GET':
      try {
        const master_admin_id = req.headers.master_admin_id;
        const AllAdmins = await Controller.getAllAdmins(master_admin_id);
        const AllAdmins_Clean = AllAdmins.map((admin) => {
          return Controller.cleanUserForClient(admin);
        });
        successResponse(req, res, AllAdmins_Clean, 200);
      } catch (error) {
        errorResponse(
          req,
          res,
          'Hubo un error al traer los admins',
          400,
          error
        );
      }
      break;

    case 'DELETE':
      try {
        const master_id = req.body.master_id;
        const to_revoke_admin_email = req.body.to_revoke_admin_email;
        const master_password = req.body.master_password;

        const revokedAdmin = await Controller.revokeAdmin(
          master_id,
          to_revoke_admin_email,
          master_password
        );
        successResponse(
          req,
          res,
          { revokedAdmin, message: 'Admin destituido' },
          200
        );
      } catch (error) {
        errorResponse(req, res, 'Hubo un error al destituir admin', 400, error);
      }
      break;

    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
