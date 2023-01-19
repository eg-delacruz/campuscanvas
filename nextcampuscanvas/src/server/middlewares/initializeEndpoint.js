import { verifyPassword } from '@server/services/passEncript';

//Session
import { getSession } from 'next-auth/react';

//Avoids CORS errors
import NextCors from 'nextjs-cors';

export async function initializeEnpoint(
  req,
  res,
  {
    secureWithSecretApiKey = true,
    secureWithSession = {
      secure: false,
      adminsOnly: false,
      allowedAdmins: 'all', //Allowed values: 'all' | 'master'
    },
    avoidCorsErrors = true,
  }
) {
  //Status
  let status = {
    error: false,
    clientErrorMessage: '',
    serverErrorMessage: '',
  };

  let session = null;

  if (secureWithSecretApiKey) {
    //Securing route with headers secret key
    const checkSecretApiKey = await verifyPassword(
      process.env.NEXT_PUBLIC_MAIN_NEXT_WEB_APP_SECRET_KEY,
      req.headers.app_secret_key
    );
    if (!checkSecretApiKey) {
      status.error = true;
      status.clientErrorMessage = 'Forbidden';
      status.serverErrorMessage = 'Forbidden user';
    }
  }

  if (secureWithSession.secure) {
    //Securing page with session
    const currentSession = await getSession({ req });

    if (!currentSession) {
      status.error = true;
      status.clientErrorMessage = 'Forbidden';
      status.serverErrorMessage = '[Network] No hay sesión';
    }

    if (secureWithSession.adminsOnly) {
      //Securing route only for admins!
      if (currentSession) {
        switch (secureWithSession.allowedAdmins) {
          case 'all':
            if (
              !(
                currentSession?.token.role === 'super_admin' ||
                currentSession?.token.role === 'admin'
              )
            ) {
              status.error = true;
              status.clientErrorMessage = 'Forbidden';
              status.serverErrorMessage = '[Network] Usuario no autorizado';
            }
            break;

          case 'master':
            if (!(currentSession?.token.role === 'super_admin')) {
              status.error = true;
              status.clientErrorMessage = 'Forbidden';
              status.serverErrorMessage = '[Network] Usuario no autorizado';
            }
            break;

          default:
            break;
        }
        session = currentSession;
      }
    }
  }

  if (avoidCorsErrors) {
    //Avoiding CORS errors
    await NextCors(req, res, {
      // Options
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
      optionsSuccessStatus: 200,
    });
  }

  return { status, session };
}
