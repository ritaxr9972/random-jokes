const fs = require('fs'); // pull in the file sustem module

const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const css = fs.readFileSync(`${__dirname}/../client/default-styles.css`);
const jokePage = fs.readFileSync(`${__dirname}/../client/joke-client.html`);

const get404Response = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write(errorPage);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getMainPage = (request,response) => {
    response.writeHead(200, { 'Content-Type': 'text/html'});
    response.write(jokePage);
    response.end();
}

module.exports.get404Response = get404Response;
module.exports.getCSS = getCSS;
module.exports.getMainPage = getMainPage;
