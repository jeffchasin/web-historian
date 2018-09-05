var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelpers = require('./http-helpers');

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
            var temp = '';
            temp += data;
            res.writeHead(200, httpHelpers.headers);
            res.end(temp);
          });
        } else {
          httpHelpers.serveAssets(res, 'loading');
          archive.addUrlToList(siteUrl, function(included) {
            // TODO: YOU ARE HERE -------------------------------------- ******
            return included; // this return does nothing! Fake return.
          });
        }
      });
    });

    // fs.appendFile(archive.paths.list, siteUrl + '\n', 'utf8', (err) => {
    //   if (err) {
    //     console.error('appendFile err', err);
    //   }
    // });
    // res.writeHead(302, { 'Content-Type': 'text/plain' });
    // res.end();
  }
  // res.end(archive.paths.list);
};


// var statusCode;

// exports.handleRequest = function (req, res) {

//   if (req.url === '/') {
//     if (req.method.toUpperCase() === 'OPTIONS') {
//       res.writeHead(
//         '200',
//         'No Content',
//         httpHelpers.optionsHeaders
//       );
//       response.end();
//     }


//     if (req.method.toUpperCase() === 'GET') {
//       // if we're here, they want the home page
//       httpHelpers.serveAssets(res, 'homePage');
//     }

//     if (req.method.toUpperCase() === 'POST') {
//       // check for the url they want
//       var siteUrl;
//       req.on('data', data => {
//         var input = '';
//         input += data;
//         input = input.split('=');
//         siteUrl = input[1];
//       }).on('end', () => {
//         // see if that's in our archived sites
//         console.log('archive.isUrlArchived(siteUrl): ', archive.isUrlArchived(siteUrl));

//         archive.isUrlArchived(siteUrl, function(fileExists) {
//           console.log('fileExists: ', fileExists);
//           if (fileExists) {
//             // if archived, send back the right page
//             httpHelpers.serveAssets(res, siteUrl);
//           }
//         });

//         // if (archive.isUrlArchived(siteUrl )) {
//         //   // if archived, send back the right page
//         //   httpHelpers.serveAssets(res, siteUrl);
//         // }
//         // else {
//         // if not archived, is it in the list?
//         if (!archive.isUrlInList(siteUrl)) {
//           //console.log('siteUrl: ', siteUrl);
//           archive.addUrlToList(siteUrl);
//         }
//         // TODO: httpHelpers.serveAssets(res, 'loading');
//         // respond with loading.html
//       });
//     }
//   } else if (req.url === archive.paths.archivedSites + '/site-name/') {
//     httpHelpers.serveAssets(res, 'homePage');
//     // TODO: do stuff here
//   } else if (req.url === '/styles.css') {
//     httpHelpers.serveAssets(res, 'css');
//   } else {
//     res.writeHead(404, httpHelpers.headers);
//     res.end('404 Error: Sorry, that page was not found.');
//   }

//   // res.end(archive.paths.list);
