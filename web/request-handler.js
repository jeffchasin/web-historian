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
      statusCode = 200;
      res.writeHead(statusCode, httpHelpers.headers);

      fs.readFile(__dirname + '/public/index.html', (err, data) => {
        if (err) { throw err; }
        var temp = '';
        temp += data;
        res.end(temp);
      });
    }

    if (req.method.toUpperCase() === 'POST') {

    }
    // ../archives/sites/site-name
    // http://127.0.0.1:8080/sites /www.google.com/

  } else if (req.url === archive.paths.archivedSites + '/site-name/') {

    // TODO: do stuff here
  } else {
    statusCode = 404;
    res.writeHead(statusCode, httpHelpers.headers);
    // TODO: make 404 page?
    res.end();
  }

  // res.end(archive.paths.list);
};
