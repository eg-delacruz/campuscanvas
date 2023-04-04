const statusMessages = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  400: 'Bad request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  405: 'Method not allowed',
  406: 'Not Acceptable',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Payload Too Large',
  414: 'URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Range Not Satisfiable',
  417: 'Expectation Failed',
  418: "I'm a teapot",
  421: 'Misdirected Request',
  422: 'Unprocessable Entity',
  423: 'Locked',
  424: 'Failed Dependency',
  426: 'Upgrade Required',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  431: 'Request Header Fields Too Large',
  451: 'Unavailable For Legal Reasons',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates',
  507: 'Insufficient Storage',
  508: 'Loop Detected',
  510: 'Not Extended',
  511: 'Network Authentication Required',
};

export function successResponse(req, res, message, status) {
  let statusCode = status;
  let statusMessage = message;
  //Configuramos los códigos de estatus por defecto en el caso de
  //que no nos venga nada
  if (!status) {
    status = 200;
  }
  if (!message) {
    statusMessage = statusMessages[status];
  }
  console.log('[RESPONSE]Operación realizada con éxito');

  //This shows in console the message sent to the user. Only use it when needed
  //console.log(message);
  //El status se muestra en el caso de insomnia en un indicador, NO en el objeto enviado
  res.status(statusCode).send({ error: '', body: statusMessage });
}

export function errorResponse(req, res, message, status, details) {
  let statusCode = status;
  let statusMessage = message;

  if (!status) {
    status = 500;
  }
  if (!message) {
    statusMessage = statusMessages[status];
  }
  //Este log serviría para YO saber qué es lo que ha pasado en el error, pero
  //el usuario no sabrá esta info. En los [] se puede poner eg el nombre del
  //módulo del que viene ese mensaje en consola para identificarlo rápido.

  console.error('[response error]' + details);
  res.status(statusCode).send({ error: statusMessage, body: '' });
}
