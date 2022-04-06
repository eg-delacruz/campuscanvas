//Response manager
import response from '@server/response';
import Controller from '@server/components/user/controller';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const users = await Controller.getUsers();
        console.log(users);
        response.success(req, res, users, 200);
      } catch (error) {
        response.error(
          req,
          res,
          'Error interno al obtener usuarios',
          400,
          error
        );
      }
      break;

    ////////////////////////////////////////////////
    case 'POST':
      console.log(req.body);
      try {
        const user = await Controller.addUser(
          req.body.email,
          req.body.password
        );
        response.success(req, res, user, 201);
      } catch (error) {
        response.error(req, res, 'Error interno al crear usuario', 400, error);
      }

      break;
    default:
      response.error(req, res, 'Método no soportado', 400);
      break;
  }
}