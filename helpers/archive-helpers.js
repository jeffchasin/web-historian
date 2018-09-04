var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(this.paths.list, 'utf8', (err, data) => {
    console.log('data: ', data);
    if (err) {
      console.error('readListOfUrls err: ', err);
    }
    var annoyingTestFormat = data.split('\n'); //[url1, url2]
    callback(annoyingTestFormat);
  });
};

exports.isUrlInList = function(url, callback) {
  // is url in the list?
  this.readListOfUrls(function(atf) {
    callback(atf.includes(url));
  });
};

exports.addUrlToList = function(url, callback) {
  if (!exports.isUrlInList(url)) {
    fs.appendFile(this.paths.list, url + '\n', (err) => {
      if (err) {
        console.error('addUrlToList err', err);
      } else {
        return true;
      }
    });
  }
};

exports.isUrlArchived = function(url, callback) {
  var myFile = this.paths.archivedSites + '/' + url;
  fs.readFile(myFile, function(err, data) {
    if (err) {
      callback(false);
    } else {
      callback(true);
    }
  });
};

exports.downloadUrls = function(urls) {
};
