var gulp = require('gulp');
var del = require('del');
var exec = require('child_process').exec;
var mocha = require('gulp-mocha');

// delete bin folder
gulp.task('clean', function(cb) {
  del(['bin'], cb);
});

// compile TypeScript files
gulp.task('build', ['clean'], function (cb) {
  gulp.src('./package.json').pipe(gulp.dest('./bin'));
  gulp.src('./.settings/.npmignore').pipe(gulp.dest('./bin'));
  gulp.src('./data/*').pipe(gulp.dest('./bin/data'))
      
  exec('tsc -p .', function (err, stdout, stderr) {
    if (stdout.length > 0) console.log(stdout);
    if (stderr.length > 0) console.error(stderr);
    cb(err);
  });
});

// run tests
gulp.task('test', ['build'], function () {
    return gulp.src('./bin/tests/*.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});

// define default task
gulp.task('default', ['build']);