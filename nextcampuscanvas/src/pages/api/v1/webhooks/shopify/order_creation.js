//make localhost online: See notion/Campus Canvas/Procesos, duración y términos/Campus Box
//Verify shopify webhook: https://www.npmjs.com/package/verify-shopify-webhook

//Response manager
import { successResponse, errorResponse } from '@server/response';
import verifyWebhook from 'verify-shopify-webhook';
import Controller from '@server/components/box_order/controller';
import userController from '@server/components/user/controller';

//Avoids CORS errors
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
  //Avoiding CORS errors
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  const { method, body } = req;

  //Receive order data from Shopify to register order and limit boxes to one per semester
  switch (method) {
    case 'POST':
      //Verifying if webhook comes from Shopify
      const { verified, topic, domain, body } = await verifyWebhook(
        req,
        process.env.SHOPIFY_WEBHOOKS_KEY
      );

      if (!verified) {
        return errorResponse(
          req,
          res,
          'Ha habido un error',
          400,
          'Origen de petición no válido'
        );
      }

      try {
        const userID = body.note_attributes[0]?.value;
        const { email, stu_email, stu_id, stu_data } =
          await userController.getUserById(userID);

        const season = process.env.NEXT_PUBLIC_CURRENT_SEASON;
        const shopify_order_number = body.order_number.toString();
        const order_created_in_shopify_at = body.created_at;
        const status_URL = body.order_status_url;
        const total_paid = body.total_price;
        const description = 'Campus Box';
        const university = stu_data.university;

        //TODO: verify if orders are storing the university when shopify not paused anymore (check controller and model)
        await Controller.createBoxOrder(
          userID,
          season,
          shopify_order_number,
          email,
          stu_email,
          stu_id,
          order_created_in_shopify_at,
          status_URL,
          total_paid,
          description,
          university
        );

        successResponse(req, res, 'Orden creada', 200);
      } catch (error) {
        errorResponse(req, res, 'Ha habido un error', 400, error);
      }

      break;

    default:
      errorResponse(req, res, 'Método no soportado', 400);
      break;
  }
}

//Esto hace que el body no se pueda leer directamente
//ya que necesitamos que body no se parsee, pues se
//necesita raw para verificar origen de shopify. Comes
//from next js
export const config = {
  api: {
    bodyParser: false,
  },
};
