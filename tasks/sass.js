import gulp from 'gulp'
import browserSync from 'browser-sync'
import sass from 'gulp-sass'
import sassGlob from 'gulp-sass-glob'
import autoprefixer from 'gulp-autoprefixer'
import cssnano from 'gulp-cssnano'
import rename from 'gulp-rename'
import uncss from 'gulp-uncss'
import notify from 'gulp-notify'
import plumber from 'gulp-plumber'

var onError = function (err) {
  notify.onError({
    title: 'Error',
    message: '<%= error %>'
  })(err)
  this.emit('end')
}

var plumberOptions = {
  errorHandler: onError
}

var autoprefixerOptions = {
  browsers: ['last 2 versions']
}
var sassOptions = {
  includePaths: [
  ]
  // outputStyle: 'compressed'
}
var reloadOptions = {
  stream: true
}

gulp.task('styles', () => {
  return gulp.src('./src/styles/scss/style.scss')
  .pipe(sassGlob())
  .pipe(autoprefixer(autoprefixerOptions))
  .pipe(sass(sassOptions).on('error', sass.logError))
  .pipe(plumber(plumberOptions))
  .pipe(gulp.dest('./build/styles'))
  .pipe(rename({ suffix: '.min' }))
  .pipe(cssnano())
  .pipe(gulp.dest('./src/styles'))
  .pipe(gulp.dest('./build/styles'))
  .pipe(gulp.dest('./public/styles'))
  .pipe(browserSync.reload(reloadOptions))
})
