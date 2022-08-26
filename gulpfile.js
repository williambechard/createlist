
'use strict';


const build = require('@microsoft/sp-build-web');
build.tslintCmd.enabled = false;
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

// disable tslint
build.tslintCmd.enabled = false;
// add eslint
const eslintPrefix = require('@voitanos/eslint-preset-spfx-react');
eslintPrefix.updateGulpfile(build);

build.initialize(require('gulp'));

const eslint = require('gulp-eslint7');

const eslintSubTask = build.subTask('eslint', function (gulp, buildOptions, done) {
  return gulp.src(['src/**/*.{ts,tsx}'])
      // eslint() attaches the lint output to the "eslint" property
      // of the file object so it can be used by other modules.
      .pipe(eslint())
      // eslint.format() outputs the lint results to the console.
      // Alternatively use eslint.formatEach() (see Docs).
      .pipe(eslint.format())
      // To have the process exit with an error code (1) on
      // lint error, return the stream and pipe to failAfterError last.
      .pipe(eslint.failAfterError());
});

build.rig.addPreBuildTask(eslintSubTask);
