var gct = require('./src/gulp-csslint-teamcity.js');
var tsm = require('teamcity-service-messages');

var reporter = function (file) {
  tsm.stdout = reporter.stdout;
  return gct(tsm, file);
};
reporter.stdout = true;

module.exports = reporter;
