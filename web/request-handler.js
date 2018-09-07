var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelpers = require('./http-helpers');
var fetcher = require('../workers/htmlfetcher');

exports.handleRequest = function (req, res) {

  //GET REQUESTS

  if (req.method === 'GET') {
    if (req.url === '/') {
      httpHelpers.serveAssets(res, 'homePage');
    } else if (req.url === '/styles.css') {
      res.writeHead(200, { 'Content-Type': 'text/css' });

      fs.readFile(__dirname + '/public/styles.css', 'utf8', (err, data) => {
        if (err) {
          console.error('styles.css err: ', err);
        }
        var temp = '';
        temp += data;
        // res.write(temp);
        res.end(temp);
      });
    } else {
      res.writeHead(200, httpHelpers.headers);
      fs.readFile(archive.paths.archivedSites + '/' + req.url, 'utf8', (err, data) => {
        // fs.readFile(archive.paths.archivedSites + '/' + archiveDomain + '/index.html', 'utf8', (err, data) => {
        if (err) {
          console.error('GET of req.url not in archive. err: ', err);
          res.writeHead(404, httpHelpers.headers);
          res.end('404 Error: Sorry, that page was not found.');
        }
        var temp = '';
        temp += data;
        // res.write(temp)
        res.end(temp);
      });
    }
  }

  //POST REQUESTS
  if (req.method === 'POST') {
    // check for the url they want
    var siteUrl;
    req.on('data', data => {
      var input = '';
      input += data;
      input = input.split('=');
      siteUrl = input[1];
    }).on('end', () => {

      // do we have this siteUrl in the archive?
      archive.isUrlArchived(siteUrl, function (urlExists) {
        if (urlExists) {
          fs.readFile(archive.paths.archivedSites + '/' + siteUrl, 'utf8', (err, data) => {
            // fs.readFile(archive.paths.archivedSites + '/' + archiveDomain + '/index.html', 'utf8', (err, data) => {
            if (err) {
              // console.error('GET of req.url not in archive. err: ', err);
              res.writeHead(404, httpHelpers.headers);
              res.end('404 Error: Sorry, that page was not found.');
            }
            if (siteUrl !== undefined) {
              archive.addUrlToList(siteUrl, function (included) {
                return included; // this return does nothing! Fake return.
              });
            }
            var temp = '';
            temp += data;
            res.writeHead(302, httpHelpers.headers);
            res.end(temp);
          });
        } else {
          httpHelpers.serveAssets(res, 'loading');
          // TODO: Broken test, still works in the app
          archive.addUrlToList(siteUrl, function (included) {
            if (included) {
              fetcher.htmlFetcher();
            }
          });
        }
      });
    });
  }
};
