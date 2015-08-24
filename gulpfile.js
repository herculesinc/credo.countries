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
  exec('tsc -p .', function (err, stdout, stderr) {
    if (stdout.length > 0) console.log(stdout);
    if (stderr.length > 0) console.error(stderr);
    
    if (!err) {
      gulp.src('./package.json').pipe(gulp.dest('./bin'));
      gulp.src('./.npmignore').pipe(gulp.dest('./bin'));
      gulp.src('./data/*').pipe(gulp.dest('./bin/data'))
    }
    
    cb(err);
  });
});

// run tests
gulp.task('test', function () {
    return gulp.src('./bin/tests/*.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});

// define default task
gulp.task('default', ['build']);