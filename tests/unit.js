define([
  'intern!bdd',
  'intern/chai!expect',
  'intern/dojo/node!gulp-util',
  'intern/dojo/node!fs',
  'intern/dojo/node!path',
  'intern/dojo/node!gulp-csslint',
  'intern/dojo/node!../index.js'
], function (bdd, expect, gutil, fs, path, csslint, gct) {
  var getFile = function (filePath) {
    filePath = 'tests/' + filePath;
    return new gutil.File({
      path: filePath,
      cwd: 'tests/',
      base: path.dirname(filePath),
      contents: fs.readFileSync(filePath)
    });
  };
  bdd.describe('gulp-csslint-teamcity', function () {

    bdd.it('should only generate testStarted and testFinished for a valid CSS file', function () {
      var file = getFile('fixtures/validCSS.css');
      var cl = csslint();

      //pass throught csslint first
      cl.write(file);
      cl.end();

      gct.stdout = false;
      var messages = gct(file);
      expect(messages.length).to.equal(2);
    });

    bdd.it('should generate one csslint error message for an invalid CSS file', function () {
      var file = getFile('fixtures/missingPrefixes.css');
      var cl = csslint();

      //pass throught csslint first
      cl.write(file);
      cl.end();

      gct.stdout = false;
      var messages = gct(file);
      expect(messages.length).to.equal(3);
    });
  });
});
