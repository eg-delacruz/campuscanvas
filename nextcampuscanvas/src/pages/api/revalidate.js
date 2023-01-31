//Route needed to refresh new uploaded data on demand (ISR on demand)
//Enter in the browser to the following route like this (change the .env token by  the current secret):
//<BASE_URL>/api/revalidate?secret=process.env.NEXT_PUBLIC_REVALIDATION_API_SECRET_TOKEN
//Response manager
import { successResponse, errorResponse } from '@server/response';

export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (
    req.query.secret !== process.env.NEXT_PUBLIC_REVALIDATION_API_SECRET_TOKEN
  ) {
    return errorResponse(req, res, 'Invalid token', 401);
  }

  console.log('La revalidación', res.revalidate);

  try {
    //Path to revalidate
    await res.revalidate('/');
    return successResponse(req, res, { revalidated: true }, 201);
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return errorResponse(req, res, 'Error al revalidar', 400, err);
  }
}
