(function () {
  'use strict';

  var teamcityReporter = function (tsm, file) {
    var messages = [];
    var name = 'CSSLint: ' + file.path;
    messages.push(tsm.testStarted({ name: name}));

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

        messages.push(tsm.testFailed({
          name: name,
          message: message.message,
          details: details
        }));
      });
    }

    messages.push(tsm.testFinished({ name: name}));

    if (!tsm.stdout) {
      return messages;
    }
  };

  module.exports = teamcityReporter;

})();
