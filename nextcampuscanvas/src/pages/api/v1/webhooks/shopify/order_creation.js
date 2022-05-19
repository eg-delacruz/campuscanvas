//make localhost live: https://www.youtube.com/watch?v=AJkyLymyTpc
//Verify shopify webhook: https://www.npmjs.com/package/verify-shopify-webhook

//Response manager
import { successResponse, errorResponse } from '@server/response';
import verifyWebhook from 'verify-shopify-webhook';
import Controller from '@server/components/box_order/controller';

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

  const { method } = req;

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
        const season = process.env.NEXT_PUBLIC_CURRENT_SEASON;
        const shopify_order_number = body.order_number;
        await Controller.createBoxOrder(userID, season, shopify_order_number);

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
//necesita raw para verificar origen de shopify
export const config = {
  api: {
    bodyParser: false,
  },
};
