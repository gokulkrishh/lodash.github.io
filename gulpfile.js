'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const pump = require('pump');

const cssnano = require('gulp-cssnano');
const htmlmin = require('gulp-htmlmin');
const purify = require('gulp-purifycss');
const uglify = require('gulp-uglify');

const base = './';
const opts = { base };

gulp.task('build-css', () =>
  pump([
    gulp.src('_site/assets/css/*.css', opts),
    purify(['_site/assets/js/*.js', './_site/**/*.html'], { 'rejected': true }),
    cssnano(),
    gulp.dest(base)
  ])
);

gulp.task('build-js', () =>
  pump([
    gulp.src('_site/**/*.js', opts),
    babel({ 'presets': ['es2015'] }),
    uglify(),
    gulp.dest(base)
  ])
);

gulp.task('build-html', () =>
  pump([
    gulp.src('_site/**/*.html', opts),
    htmlmin({
      'collapseBooleanAttributes': true,
      'collapseWhitespace': true,
      'removeAttributeQuotes': true,
      'removeComments': true,
      'removeEmptyAttributes': true,
      'removeOptionalTags': true,
      'removeRedundantAttributes': true
    }),
    gulp.dest(base)
  ])
);

gulp.task('build', ['build-css', 'build-js', 'build-html']);
