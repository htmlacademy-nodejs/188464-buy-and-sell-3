'use strict';
const http = require(`http`);
const fsPromises = require(`fs`).promises;
const HttpStatus = require(`http-status-codes`);
const {MOCK_PATH} = require(`./constants`);

const DEFAULT_PORT = 3000;

const getMockTitles = async () => {
  const json = await fsPromises.readFile(MOCK_PATH, {encoding: `utf-8`});
  return JSON.parse(json).map(({title}) => title);
};

const renderTitlesList = async () => {
  const titles = await getMockTitles();
  return `<h2>Заголовки:</h2><ul>${titles.map((title) => `<li>${title}</li>`).join(``)}</ul>`;
};

const renderPage = (content) => {
  return `<html lang="ru">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
    </head>
    <body>
    ${content}
    </body>
</html>`;
};

const renderTitlesPage = async () => {
  const titlesList = await renderTitlesList();
  return renderPage(titlesList);
};

const onClientConnect = async (request, response) => {
  try {
    if (request.url === `/`) {
      const page = await renderTitlesPage();
      response.writeHead(HttpStatus.OK, {
        'Content-Type': `text/html; charset=utf-8`,
      });
      response.end(page);
    } else {
      throw Error(`Not Found`);
    }
  } catch (err) {
    response.writeHead(HttpStatus.NOT_FOUND, {
      'Content-Type': `text/html; charset=utf-8`,
    });
    response.end(renderPage(HttpStatus.getStatusText(HttpStatus.NOT_FOUND)));
  }
};

exports.start = (port) => {
  port = Number.isNaN(port) ? DEFAULT_PORT : port;
  const httpServer = http.createServer(onClientConnect);
  httpServer.listen(port, (err) => {
    if (err) {
      return console.error(`http-server creation error.`, err);
    }

    return console.info(`listening on ${port}.`);
  });
};
