import { successResponse, errorResponse } from '@server/response';
import Controller from '@server/components/user/controller';
import jwt from 'jsonwebtoken';

//Avoids CORS errors
import NextCors from 'nextjs-cors';

//Get request IP Address
import requestIp from 'request-ip';

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  const { method } = req;

  //Route doesn´t need to be secured with app secret key

  switch (method) {
    //We veryfy token and if yes, validate student account
    //Info comes from link sent to university email
    case 'GET':
      try {
        const IP_Address = requestIp.getClientIp(req);
        const id = req.query.verify_stu_acc[0];
        const token = req.query.verify_stu_acc[1];
        const user = await Controller.getUserById(id);

        //We create the same secret as in the verif_email route
        const secret = process.env.JWT_SECRET + user.password;
        try {
          const payload = jwt.verify(token, secret);
          //If the token is valid, we verify studen account

          const stu_email = payload.stu_email;

          await Controller.verifyStudentAccount(user, stu_email, IP_Address);

          res.status(200).redirect('/auth/cuenta_verificada');
        } catch (error) {
          errorResponse(
            req,
            res,
            'El enlace de validación ha expirado',
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
