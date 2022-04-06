//Response manager
import { successResponse, errorResponse } from '@server/response';
import Controller from '@server/components/user/controller';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const users = await Controller.getUsers();
        console.log(users);
        successResponse(req, res, users, 200);
      } catch (error) {
        errorResponse(req, res, error, 400, error);
      }
      break;

    ////////////////////////////////////////////////
    case 'POST':
      try {
        const user = await Controller.addUser(
          req.body.email,
          req.body.password
        );
        successResponse(req, res, user, 201);
      } catch (error) {
        if (error.message.includes('duplicate key')) {
          errorResponse(req, res, 'El email ya existe', 400, error);
        }
        errorResponse(req, res, 'Mensaje interno del servidor', 400, error);
      }

      break;
    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
