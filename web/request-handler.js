var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelpers = require('./http-helpers');
var fs = require('fs');

var statusCode;

exports.handleRequest = function (req, res) {

  if (req.url === '/') {
    if (req.method.toUpperCase() === 'OPTIONS') {
      res.writeHead(
        '200',
        'No Content',
        httpHelpers.optionsHeaders
      );
      response.end();
    }


    if (req.method.toUpperCase() === 'GET') {
      // if we're here, they want the home page
      httpHelpers.serveAssets(res, 'homePage');
      // statusCode = 200;
      // res.writeHead(statusCode, httpHelpers.headers);

      // fs.readFile(__dirname + '/public/index.html', (err, data) => {
      //   if (err) { throw err; }
      //   var temp = '';
      //   temp += data;
      //   res.end(temp);
      // });
    }

    if (req.method.toUpperCase() === 'POST') {

    }
    // ../archives/sites/site-name
    // http://127.0.0.1:8080/sites /www.google.com/

  } else if (req.url === archive.paths.archivedSites + '/site-name/') {

    // TODO: do stuff here
  } else if (req.url === '/styles.css') {
    httpHelpers.serveAssets(res, 'css');
  } else {
    res.writeHead(404, httpHelpers.headers);
    res.end('404 Error: Sorry, that page was not found.');
  }

  // res.end(archive.paths.list);
};
