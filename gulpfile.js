var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	cssnano = require('gulp-cssnano'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	spritesmith = require('gulp.spritesmith'),
	sourcemaps = require('gulp-sourcemaps'),
	plumber = require('gulp-plumber'),
	pug = require('gulp-pug');

gulp.task('sass', function () {
	return gulp.src('app/sass/style.sass')
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('pug', function () {
	return gulp.src(['app/pug/*.pug', '!app/pug/_*.pug'])
		.pipe(plumber())
		.pipe(pug({ pretty: true }))
		.pipe(gulp.dest("app"))
		.pipe(browserSync.stream());
});

gulp.task('css', function () {
	return gulp.src('app/libs/**/*.css')
		.pipe(concat('libs.min.css'))
		.pipe(cssnano())
		.pipe(gulp.dest('app/css'));
});

gulp.task('js', function () {
	return gulp.src('app/libs/**/*.js')
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
});

gulp.task('sprite', function () {
	var spriteData = gulp.src('app/img/sprite/*.png').pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: 'sprite.css',
		padding: 5
	}));
	return spriteData.pipe(gulp.dest('app/img/'));
});

gulp.task('watch', ['browser-sync', 'css', 'js', 'pug'], function () {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/pug/**/*.pug', ['pug']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function () {
	return del.sync('dist');
});

gulp.task('img', function () {
	return gulp.src('app/img/**/*')
		// .pipe(cache(imagemin({
		// 	interlaced: true,
		// 	progressive: true,
		// 	svgoPlugins: [{ removeViewBox: false }],
		// 	use: [pngquant()]
		// })))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['clean', 'img'], function () {

	var buildCss = gulp.src('app/css/**/*.css')
		.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));

});

gulp.task('clear', function () {
	return cache.clearAll();
});

gulp.task('default', ['watch']);
