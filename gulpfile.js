var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    gulpsync = require('gulp-sync')(gulp),
    autoprefixer = require('gulp-autoprefixer'),
    sassGlob = require('gulp-sass-glob'),
    uglify = require('gulp-uglify'),
    fileinclude = require('gulp-file-include');

gulp.task('build-html', function () {
    return gulp.src('app/pages/*.html') //Выберем файлы по нужному пути
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@root'
        })) // Склеиваем файлы (директива @@). Отсчет в путях директив @@ идет от места где находится гулп файл(этот)
        .pipe(gulp.dest('dist')); // выгружаем в рут фолдер
});

gulp.task('sass', function () {
    return gulp.src('app/sass-globals/main.scss')
        .pipe(sassGlob())
        .pipe(sass()).on('error', sass.logError)
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('move-fonts', function () {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('move-libs', function () {
    return gulp.src('app/libs/**/*')
        .pipe(gulp.dest('dist/libs'));
});

gulp.task('move-js', function () {
    return gulp.src('app/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('move-img', function () {
    return gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('clean', function () {
    return del.sync('dist');
});

gulp.task('production', gulpsync.sync([
    'clean', [
        'sass',
        'build-html',
        'move-fonts',
        'move-libs',
        'move-js',
        'move-img'
    ]
]));

gulp.task('watch', ['sass', 'build-html', 'move-js', 'move-libs', 'move-fonts', 'move-img'], function () {
    gulp.watch('app/**/*.scss', ['sass']);
    gulp.watch('app/**/*.html', ['build-html']);
    gulp.watch('app/js/**/*.js', ['move-js']);
    gulp.watch('app/libs/**/*', ['move-libs']);
    gulp.watch('app/img/**/*', ['move-img']);
});