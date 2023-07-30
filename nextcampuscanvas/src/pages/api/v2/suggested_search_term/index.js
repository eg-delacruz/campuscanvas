import controller from "@server/components/suggested_search_term/controller";

//Response manager
import { successResponse, errorResponse } from "@server/response";

//Middlewares
import { initializeEnpoint } from "@server/middlewares/initializeEndpoint";

export default async function handler(req, res) {
  //Initializing Endpoing
  const { status, session } = await initializeEnpoint(req, res, {
    secureWithSecretApiKey: true,
    secureWithSession: {
      secure: false,
      adminsOnly: false,
      allowedAdmins: "all",
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
    case "POST":
      try {
        const { search_term } = body;
        const new_search_term = await controller.addSearchTerm(search_term);
        successResponse(req, res, new_search_term, 201);
      } catch (error) {
        errorResponse(
          req,
          res,
          "Hubo un error al obtener la información solicitada",
          400,
          error
        );
      }
      break;

    default:
      errorResponse(req, res, "Método no soportado", 400);
      break;
  }
}
