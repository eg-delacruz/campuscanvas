//DB connection
import dbConnect from '@server/dbConnect';
import config from '@server/config';

//Response manager
import response from '@server/response';

//Model
import User from '@server/components/user/model';

dbConnect(config.dbURL);

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const user = await User.findById(id);
        if (!user) {
          response.error(req, res, 'Usuario no encontrado', 404, error);
        }
        response.success(req, res, user, 200);
      } catch (error) {
        response.error(req, res, error.message, 400, error);
      }
      break;

    case 'PUT':
      try {
        //never use findByIdAndUpdate, is will skip the validation we have in the model
        //use findById and .save() instead
        const user = await User.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!user) {
          response.error(req, res, 'User not found', 404);
        }
        response.success(req, res, user, 200);
      } catch (error) {
        response.error(
          req,
          res,
          'Hubo un error al modificar el usuario',
          400,
          error
        );
      }
      break;
    case 'DELETE':
      try {
        const deletedUser = await User.deleteOne({ _id: id });
        if (!deletedUser) {
          response.error(req, res, 'Usuario no encontrado', 400, error);
        }
        response.success(req, res, {}, 200);
      } catch (error) {
        response.error(
          req,
          res,
          'Ocurrió un error al eliminar el usuario',
          400,
          error
        );
      }
      break;
    default:
      response.error(req, res, 'Método no soportado', 400, error);
      break;
  }
};
