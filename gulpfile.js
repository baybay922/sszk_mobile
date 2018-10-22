const gulp = require('gulp');
const zip = require('gulp-zip');
const path = require('path');
const scp = require('gulp-scp2');

const getVersion = function () {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  let day = date.getDate();
  if (day < 10) {
    day = '0' + day;
  }
  let hour = date.getHours();
  if (hour < 10) {
    hour = '0' + hour;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  let seconds = date.getSeconds();
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return `${year}${month}${day}${hour}${minutes}${seconds}`;
};

const timestamp = getVersion();

gulp.task('zip', () => {
  return gulp.src([
    path.resolve(__dirname, './dist/**/*')
  ])
    .pipe(zip(`sszk-${timestamp}.zip`))
    .pipe(gulp.dest('./package'))
});

gulp.task('wrap', () => {
  return gulp.src([
    path.resolve(__dirname, './dist/**/*')
  ])
    // .pipe(zip(`mtm-${timestamp}.zip`))
    .pipe(gulp.dest(`./package/duojia-${timestamp}`))
});

// gulp.task('scp', () => {
//   return gulp.src('./dist/**/*')
//     .pipe(scp({
//       host: '172.16.1.81',
//       username: 'work',
//       password: 'ykTOUR#9log',
//       dest: `/home/work/data/www/test.static.yktour.com.cn/mtm/mtm-${timestamp}`
//     }))
//     .on('error', e => {
//       console.log('upload error:', e);
//     })
// });

// gulp.task('scp2', () => {
//   return gulp.src("./dist/**/*")
//     .pipe(scp({
//       host: "www.baoqin.me",
//       username: "root",
//       password: "baoqin.me",
//       dest: `/root/testscp/mtm-${timestamp}`
//     }))
//     .on('error', e => {
//       console.log('upload error:', e);
//     })
// })
