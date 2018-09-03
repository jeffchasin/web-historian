var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.optionsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'content-length': 0,
};

exports.serveAssets = function (res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  //
  if (asset === 'homePage') {
    res.writeHead(200, exports.headers);

    fs.readFile(__dirname + '/public/index.html', 'utf8', (err, data) => {
      if (err) {
        console.error('homePage err: ', err);
      }
      var temp = '';
      temp += data;
      // res.write(temp)
      res.end(temp);
    });
  } else if (asset === 'css') {
    res.writeHead(200, { 'Content-Type': 'text/css' });

    fs.readFile(__dirname + '/public/styles.css', 'utf8', (err, data) => {
      if (err) {
        console.error('style.css err: ', err);
      }
      var temp = '';
      temp += data;
      // res.write(temp);
      res.end(temp);
    });
  }
  // else {
  // var archiveDomain = asset;
  // console.log('archiveDomain', archiveDomain);
  // res.writeHead(200, exports.headers);
  // fs.readFile(archive.paths.archivedSites + '/' + archiveDomain + '/index.html', 'utf8', (err, data) => {
  // // fs.readFile(archive.paths.archivedSites + '/' + archiveDomain + '/index.html', 'utf8', (err, data) => {
  //   if (err) {
  //     console.error('archiveDomain err: ', err);
  //   }
  //   var temp = '';
  //   temp += data;
  //   // res.write(temp)
  //   res.end(temp);
  // });
  // }
};

// As you progress, keep thinking about what helper functions you can put here!
