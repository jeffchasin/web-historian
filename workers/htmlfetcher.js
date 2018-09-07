// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archiveHelpers = require('../helpers/archive-helpers');

exports.htmlFetcher = function () {
  archiveHelpers.readListOfUrls().then(function(urls) {
    archiveHelpers.downloadUrls(urls);
  });
};

this.htmlFetcher();
