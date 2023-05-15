import {contentful_preview_client} from '@services/contentful/client'

//Response manager
import { successResponse, errorResponse } from '@server/response';

//Middlewares
import { initializeEnpoint } from '@server/middlewares/initializeEndpoint';

//Endpoint to get blog preview
export default async function handler(req, res) {
   
  //Initializing Endpoing
  const { status, session } = await initializeEnpoint(req, res, {
    secureWithSecretApiKey: false,
    secureWithSession: {
      secure: false,
      adminsOnly: false,
      allowedAdmins: '',
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

  const { secret, slug } = req.query

  //Check if request is comming from Contentful
  if(secret !== process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_SECRET || !slug) {
    return errorResponse(
        req,
        res,
        'Token de acceso no válido',
        401,
        'Token de acceso no válido'
        );
  }

  const response = await contentful_preview_client.getEntries({
    content_type: 'post',
    'fields.slug': slug,
  })

  const post = response?.items[0]

    if(!post) {
        return errorResponse(
            req,
            res,
            'Slug inválido',
            404,
            'Slug inválido'
        )
    }

    //We set a cookie to enable preview mode
    res.setPreviewData({})
    const url = `/blog/${post.fields.slug}`
    //we redirect to the page we want to preview
    res.writeHead(
        307,
        {Location: url}
    )
    res.end()
}