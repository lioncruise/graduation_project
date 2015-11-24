'use strict';

const gulp = require('gulp');
const notify = require('gulp-notify');
const babel = require('gulp-babel');
const jscs = require('gulp-jscs');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const nodemon = require('gulp-nodemon');
const co = require('co');

gulp.task('dev', () => {
  nodemon({
    script: 'out/worker.js',
    ext: 'src/**/*.js',
    ignore: ['out/**/*.js'],
    tasks: ['compile'],
    env: {
      NODE_ENV: 'development',
    },
  });
});

gulp.task('compile', () => {
  return gulp.src(['src/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('out'));
});

gulp.task('jscs', () => {
  return gulp.src(['./src/**/*.js'])
    .pipe(jscs({
      configPath: '.jscsrc',
    }))
    .pipe(jscs.reporter());
});

gulp.task('lint', () => {
  return gulp.src(['./src/**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('test', ['lint', 'jscs'], () => {});

gulp.task('init', ['compile'], (done) => {
  const init = require('./out/init');
  init.run().then(done).catch((e) => {
    console.log(e);
  });
});

gulp.task('fake', ['init'], (done) => {
  const fake = require('./out/fake');
  fake.run().then(done);
});

gulp.task('doc', () => {
  nodemon({
    script: 'out/doc/index.js',
    ignore: ['**/*.js'],
    env: {
      NODE_ENV: 'test',
    },
  });
});

gulp.task('build', ['test', 'doc'], () => {
  gulp.src('/')
    .pipe(notify({
      title: 'Task Builder',
      message: 'Successfully built server',
    }));
});
