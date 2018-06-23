const gulp = require('gulp');
const runSequence = require('run-sequence');
const chalk = require('chalk');

const buildFrontend = require('./frontend.build');
const pkg = require('../package.json');
const { dir } = require('../config');

gulp.task('build:frontend', (done) => {
  buildFrontend(done);
});

gulp.task('copy', () => gulp.src([
  `{${dir.backend},${dir.config},${dir.static}}/**/*.*`,
  pkg.main,
  'package.json'
])
  .pipe(gulp.dest(dir.dist)));

gulp.task('finished', () => {
  console.log(chalk.cyan('  Build complete.\n'));
  console.log(chalk.yellow(
    `  cd ${dir.dist} && npm start \n`
  ));
});

gulp.task('building', (done) => {
  runSequence(
    'build:frontend',
    'eslint:backend',
    'copy',
    'finished',
    done
  );
});
