//Route secured as shown in https://www.youtube.com/watch?v=cOgogGJ6_7M&t=36s  (min 56)
//Session
import { getSession } from 'next-auth/react';

//Response manager
import { successResponse, errorResponse } from '@server/response';
import Controller from '@server/components/user/controller';

//Get request IP Address
import requestIp from 'request-ip';

//Avoids CORS errors
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
  //Securing page with session
  const session = await getSession({ req });
  if (!session) {
    return errorResponse(req, res, 'Forbidden', 403, '[Network] No hay sesión');
  }

  //Avoiding CORS errors
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  const { body, method } = req;

  //Securing route with headers secret key
  if (
    req.headers.app_secret_key !=
    process.env.NEXT_PUBLIC_MAIN_NEXT_WEB_APP_SECRET_KEY
  ) {
    return errorResponse(req, res, 'Forbidden', 403, 'Forbidden user');
  }

  //GET user info. Used to update header user name
  switch (method) {
    case 'GET':
      try {
        const id = req.query.index;
        const user = await Controller.getUserById(id);
        const cleanUser = Controller.cleanUserForClient(user);
        successResponse(req, res, cleanUser, 201);
      } catch (error) {
        errorResponse(req, res, 'Usuario no encontrado', 400, error);
      }
      break;

    //Save/update student data
    //Always needs to receive the website location to proceed
    case 'PATCH':
      try {
        if (!body.website_location) {
          console.log(`[Network] No website location received`);
          return errorResponse(
            req,
            res,
            'Hubo un error al procesar la solicitud',
            400
          );
        }

        /////////////PATCH: Info from register step 2 (auth/registro)

        const IP_Address = requestIp.getClientIp(req);
        if (body.website_location === 'register_step_2') {
          const id = body.id;
          const gender = body.gender;
          const university = body.university;
          const faculty = body.faculty;
          const academic_degree = body.academic_degree;
          const browserName = body.browserName;

          const updatedUser = await Controller.updateStuData(
            id,
            gender,
            university,
            faculty,
            academic_degree,
            browserName,
            IP_Address
          );

          console.log(`[Network] ${updatedUser.nickname} updated successfully`);
          return successResponse(
            req,
            res,
            'Operación realizada con éxito',
            200
          );
        }

        /////////////PATCH: Info from profile editing (/cuenta)
        if (body.website_location === 'edit_profile') {
          const {
            id,
            gender,
            nickname,
            birthdate,
            phone,
            street,
            city,
            house_number,
            postal_code,
            observations,
            country,
            faculty,
            university,
            last_uni_year,
            last_uni_semester,
            academic_degree,
          } = body;

          const updatedUser = await Controller.editProfile(
            id,
            gender,
            nickname,
            birthdate,
            phone,
            street,
            city,
            house_number,
            postal_code,
            observations,
            country,
            faculty,
            university,
            last_uni_year,
            last_uni_semester,
            academic_degree
          );
          console.log(`[Network] ${updatedUser.nickname} updated successfully`);
          successResponse(req, res, 'Operación realizada con éxito', 200);
        }
        /////////////PATCH: Change password (/auth/cambiar_password
        if (body.website_location === 'change_password') {
          const { userID, currentPassword, newPassword } = body;
          await Controller.changePassword(userID, currentPassword, newPassword);
          successResponse(req, res, 'Operación realizada con éxito', 200);
        }
      } catch (error) {
        errorResponse(req, res, 'Error al actualizar datos', 400, error);
      }
      break;
    case 'DELETE':
      try {
        const id = req.query.index;
        await Controller.deleteUser(id);
        successResponse(req, res, 'Usuario eliminado', 200);
      } catch (error) {
        errorResponse(req, res, 'Error al eliminar usuario', 400, error);
      }
      break;
    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
