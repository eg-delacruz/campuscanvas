import { successResponse, errorResponse } from '@server/response';
import Controller from '@server/components/user/controller';
import jwt from 'jsonwebtoken';

//Avoids CORS errors
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  const { method } = req;

  switch (method) {
    //We veryfy token and if yes, validate student account
    case 'GET':
      try {
        const id = req.query.verify_stu_acc[0];
        const token = req.query.verify_stu_acc[1];
        const user = await Controller.getUserById(id);

        //We create the same secret as in the verif_email route
        const secret = process.env.JWT_SECRET + user.password;
        try {
          const payload = jwt.verify(token, secret);

          //If the token is valid, we verify studen account
          const stu_email = payload.stu_email;
          await Controller.verifyStudentAccount(user, stu_email);

          res.status(200).redirect('/auth/cuenta_verificada');
        } catch (error) {
          errorResponse(
            req,
            res,
            'El enlace para reestablecer tu contraseña ha expirado',
            400,
            error
          );
        }
      } catch (error) {
        errorResponse(req, res, error.message, 400, error);
      }
      break;
    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}
