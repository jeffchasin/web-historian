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
  var fileContents = fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    if (err) {
      console.error('readListOfUrls err: ', err);
    }
    var temp = '';
    temp += data;
    return temp;
  });
  return fileContents;
};

exports.isUrlInList = function(url, callback) {
  var contents = exports.readListOfUrls();
  if (!contents) { return false; }
  var listArray = contents.split('\n');
  var listSet = new Set(listArray);
  return listSet.has(url);
};

exports.addUrlToList = function(url, callback) {
  if (!exports.isUrlInList(url)) {
    fs.appendFile(exports.paths.list, url, (err) => {
      if (err) {
        console.error('addUrlToList err', err);
      } else {
        return true;
      }
    });
  }
};

exports.isUrlArchived = function(url, callback) {

  // console.log('url: ', url);
  // if ( fs.Stats(exports.paths.archivedSites + '/' + url ) ) {
  //   console.log('Directory: ', fs.stat(exports.paths.archivedSites + '/' + url ))
  //   return fs.Stats(exports.paths.archivedSites + '/' + url ).isDirectory();
  // }
  // return false;
  // TODO: WHAT IS UP WITH STAT??
  fs.stat(exports.paths.archivedSites + '/' + url, function(err, stats) {
    if (err) {
      console.log('fs.stat err: ', err);
    }
    console.log('fs.stat path: ', exports.paths.archivedSites + '/' + url);
    console.log('stats: ', stats);
    return stats.isDirectory();
  });
};

exports.downloadUrls = function(urls) {
};
