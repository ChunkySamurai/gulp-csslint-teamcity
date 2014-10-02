(function () {
  'use strict';

  var teamcityReporter = function (tsm, file) {
    var name = 'CSSLint: ' + file.path;
    tsm.testStarted({ name: name});

    if (file.csslint.errorCount > 0) {
      file.csslint.results.forEach(function (result) {
        var message = result.error;
        var details =
          '[' +
          (
            typeof message.line !== 'undefined' ?
              'L' + message.line +
              ':' +
              'C' + message.col
            :
             'GENERAL'
          ) +
          '] ' +
          message.message + ' ' + message.rule.desc + ' (' + message.rule.id + ')';

        tsm.testFailed({
          name: name,
          message: message.message,
          details: details
        });
      });
    }

    tsm.testFinished({ name: name});
  };

  module.exports = teamcityReporter;

})();
