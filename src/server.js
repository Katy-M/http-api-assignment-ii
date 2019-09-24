const http = require('http');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  
};

http.createServer(onRequest).listen(port);
console.log(`Listening on localhost:${port}`);
