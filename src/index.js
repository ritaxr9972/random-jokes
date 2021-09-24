console.log('First web service starting up ...');

// 1 - pull in the HTTP server module

const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses');
const jsonHandler = require('./jsonResponses');

// 2 - pull in URL and query modules (for URL parsing)

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/random-joke': jsonHandler.getResponse,
  notFound: htmlHandler.get404Response,
  '/default-styles.css': htmlHandler.getCSS,
};

const onRequest = (request, response) => {
  // console.log(request.headers);
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;
  const params = query.parse(parsedUrl.query);
  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];
  const httpMethod = request.method;
  // console.log("params=", params);
  if (urlStruct[pathname]) {
    urlStruct[pathname](request, response, acceptedTypes, params, httpMethod);
  } else {
    urlStruct.notFound(request, response, params);
  }
};

// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
