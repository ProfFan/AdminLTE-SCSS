var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    notify = require("gulp-notify"),
    bower = require('gulp-bower'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify');

var config = {
    sassPath: './assets/sass',
    bowerDir: './bower_components'
}

gulp.task('publish', function() {
    return gulp.src(['./public/**/*']).pipe(gulp.dest('../sites/adminlte'));
});

gulp.task('bower', function () {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});

gulp.task('icons', function () {
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
        .pipe(gulp.dest('./public/fonts'));
});

gulp.task('fonts', function () {
    return gulp.src([
        config.bowerDir + '/Han/font/**.*',
        config.bowerDir + '/Ionicons/fonts/**.*',
        config.bowerDir + '/bootstrap-sass/assets/fonts/bootstrap/**.*'
    ])
        .pipe(gulp.dest('./public/fonts'));
});

gulp.task('css', function () {
    return sass([config.sassPath + '/AdminLTE.scss',config.sassPath + '/landing.scss'], {
        style: 'compressed',
        loadPath: [
            config.sassPath,
            'bower_components/bootstrap-sass/assets/stylesheets',
            'bower_components/Ionicons/scss'
        ]
    })
        .on("error", notify.onError(function (error) {
            return "Error: " + error.message;
        }))
        .pipe(gulp.dest('./public/css'));
});

 
gulp.task('js', function() {
  gulp.src([
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
      'bower_components/jquery-easing/jquery.easing.min.js',
      'bower_components/wow/dist/wow.min.js',
      'bower_components/Han/dist/han.min.js',
      'assets/js/app.js'
    ])
    .pipe(concat("all.js"))
    .pipe(minify())
    .pipe(gulp.dest('public/js'))
});

gulp.task('watch', function() {
    gulp.watch(config.sassPath + '/**/*.scss', ['publish','css']);
    gulp.watch('./public/index.html', ['publish']);
});

gulp.task('default', ['bower', 'icons', 'fonts', 'css']);