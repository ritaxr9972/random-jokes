console.log('First web service starting up ...');

// 1 - pull in the HTTP server module

const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses');
const jsonHandler = require('./jsonResponses');
const mediaHandler = require('./mediaResponses.js');

// 2 - pull in URL and query modules (for URL parsing)

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handlePost = (request, response, parsedURL) => {
  if (parsedURL.pathname === '/adduser') {
    const body = [];

    request.on('error', (err) => {
      console.dir(error);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      jsonHandler.addTeam(request, response, bodyParams);
    });
  }
};

const handleGet = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (parsedUrl.pathname === '/getTeams') {
    jsonHandler.getTeams(request, response);
  } else if (parsedUrl.pathname === '/mainPage') {
    htmlHandler.getMainPage(request, response);
  } else if (parsedUrl.pathname === '/buildTeam') {
    htmlHandler.getBuildTeam(request, response);
  } else if (parsedUrl.pathname === '/pikachu') {
    mediaHandler.getPikachu(request, response);
  } else if (parsedUrl.pathname === '/pokeball') {
    mediaHandler.getPokeball(request, response);
  } else if(parsedUrl.pathname === '/admin') {
      htmlHandler.getAdmin(request,response);
  } else if(parsedUrl.pathname === '/get404') {
      htmlHandler.get404Response(request,response);
  }
    else {
    htmlHandler.getMainPage(request, response);
  }
};

const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);
  if (request.method === 'POST') {
    handlePost(request, response, parsedURL);
  } else {
    handleGet(request, response, parsedURL);
  }
};

// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
