const http = require('http');
const url = require('url');

const htmlHandler = require('./htmlHandler.js');
const jsonHandler = require('./jsonHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getStylesheet,
    '/getUsers': jsonHandler.getUsers,
    notFound: jsonHandler.notFound,
  },
  HEAD: {

  },
  POST: {

  },
};
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  // check if a handler for the request is implemented
  if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response);
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);
console.log(`Listening on localhost:${port}`);
