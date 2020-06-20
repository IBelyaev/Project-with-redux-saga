var gulp = require('gulp'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create();

gulp.task('build', function(cn) {
    console.log('Start!');
    
    gulp.src('src/index.html')
        .pipe(gulp.dest('build'));
    gulp.src('src/fonts/**.*')
        .pipe(gulp.dest('build/fonts'));

    console.log('html and fonts was moved');

    gulp.src('src/less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('build'));

    console.log('less was recompile to css and moved');

    gulp.src('src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'));

    console.log('js was reduced and moved');

    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'));

    console.log('img was reduced and moved');
    console.log('Finish!');

    cn();
});

gulp.task('less', function(done) {
    gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('src'))
        .pipe(browserSync.stream());


    done();
});

gulp.task('webserver', function(done) {
    browserSync.init({
        server: 'src/'
    });

    gulp.watch('src/less/*.less', gulp.series('less'));
    gulp.watch('scr/*.html').on('change', () => {
      browserSync.reload();
      done();
    });
    gulp.watch('scr/images/*').on('change', () => {
        browserSync.reload();
        done();
    });
    gulp.watch('scr/fonts/*').on('change', () => {
        browserSync.reload();
        done();
    });
  
    done();
});

gulp.task('start', gulp.series('less', 'webserver'));
