'use strict';
import gulp from 'gulp';
import babel from 'gulp-babel';

gulp.task('babel', ()=>{
  return gulp.src('src/**/*.js')
  .pipe(babel({
    presets:['node5']
}))
  .pipe(gulp.dest('dist'));
});




gulp.task('watch', ()=>{
  gulp.watch('src/**/*.js',['babel']);
});

gulp.task('default',['watch','babel']);

