var gct = require('./src/gulp-csslint-teamcity.js');
var tsm = require('teamcity-service-messages');

module.exports = gct.bind({}, tsm);
