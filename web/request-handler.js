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
    }

    if (req.method.toUpperCase() === 'POST') {
      // check for the url they want
      var siteUrl;
      req.on('data', data => {
        var input = '';
        input += data;
        input = input.split('=');
        siteUrl = input[1];
        //console.log(siteUrl);
      }).on('end', () => {
        // see if that's in our archived sites
        if (archive.isUrlArchived(siteUrl)) {
          // if archived, send back the right page
          httpHelpers.serveAssets(res, siteUrl);
        } else {
          // if not archived, is it in the list?
          if (!archive.isUrlInList(siteUrl)) {
            //console.log('siteUrl: ', siteUrl);
            archive.addUrlToList(siteUrl);
          }
          // TODO: httpHelpers.serveAssets(res, 'loading');
          // respond with loading.html
        }
      });
    }


  } else if (req.url === archive.paths.archivedSites + '/site-name/') {
    httpHelpers.serveAssets(res, 'homePage');
    // TODO: do stuff here
  } else if (req.url === '/styles.css') {
    httpHelpers.serveAssets(res, 'css');
  } else {
    res.writeHead(404, httpHelpers.headers);
    res.end('404 Error: Sorry, that page was not found.');
  }

  // res.end(archive.paths.list);
};
