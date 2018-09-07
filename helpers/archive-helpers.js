var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');
var Promise = require('bluebird');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function (pathsObj) {
  _.each(pathsObj, function (path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function () {
  return new Promise(function (resolve, reject) {
    fs.readFile(exports.paths.list, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      var annoyingTestFormat = data.split('\n'); //[url1, url2]
      resolve(annoyingTestFormat);
    });
  });
};

exports.isUrlInList = function (url) {
  // is url in the list?
  return new Promise((resolve, reject) => exports.readListOfUrls()
    .then(results => resolve(results.includes(url)))

    // exports.readListOfUrls(function (atf) {
    //   resolve(atf.includes(url));
    // });
  );
};

// quick test from Rupa:
//exports.isUrlInList('www.google.com').then((results) => console.log('isUrlInList: ', results));


exports.addUrlToList = function (url) {
  return new Promise(function (resolve, reject) {
    exports.isUrlInList(url, function (included) {
      if (included) {
        resolve(included);
      } else {
        fs.appendFile(exports.paths.list, url + '\n', (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(included);
          }
        });
      }
    });
  });
};

exports.isUrlArchived = function (url) {
  return new Promise(function (resolve, reject) {
    var myFile = exports.paths.archivedSites + '/' + url;
    fs.readFile(myFile, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

exports.downloadUrls = function (urls) {
  // console.log('urlsArray: ', urls);
  urls.forEach(function (url) {
    request('http://' + url, function (error, response, body) {
      fs.writeFile(exports.paths.archivedSites + '/' + url, body, 'utf8', (err) => {
        if (err) {
          // return;
          // console.log('url: ', url);
          // console.log('body', body);
          // console.log('exports.paths.archivedSites: ', exports.paths.archivedSites + '/' + url);
          // console.error('writeFile err: ', err);
        }
      });
    });
  });
};
