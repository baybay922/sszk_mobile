var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const fs = require('fs');

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {indentedSyntax: true}),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

const shell = require('shelljs');
//const testJavaSVN = 'svn://172.16.1.80/ykly/server/mbpm/src/main/webapp';
//const prodJavaSVN = 'svn://119.61.27.85/ykly/server/mbpm/src/main/webapp';
const tmp = path.resolve(__dirname, './tmp');
const dist = path.resolve(__dirname, '../dist');
const root = path.resolve(__dirname, '../');
const indexjsp = path.resolve(tmp, './index.jsp');
const indexhtml = path.resolve(dist, './index.html');

// exports.updateIndexJSP = function (env) {
//   if (!shell.which('svn')) {
//     shell.echo('找不到svn命令');
//     return shell.exit(1);
//   }
//   shell.rm('-rf', tmp);
//   const svn = (env && env === 'prod') ? prodJavaSVN : testJavaSVN;
//   shell.exec(`svn checkout --depth=empty ${svn} ${tmp}`);
//   shell.cd(tmp);
//   shell.exec(`svn update index.jsp`);
//   fs.stat(indexhtml, e => {
//     if (e) {
//       return 'index.html不存在，请先执行编译';
//     }
//     let html = fs.readFileSync(indexhtml, {encoding: 'utf8'});
//     let jsp = `<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>${html}`;
//     fs.writeFileSync(indexjsp, jsp, {encoding: 'utf8'});
//     shell.cd(tmp);
//     shell.exec('svn commit -m "update index.jsp" index.jsp');
//     console.log('index.jsp updated');
//     shell.cd(root);
//     shell.rm('-rf', tmp);
//   });
// };
