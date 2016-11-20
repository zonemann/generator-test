/**
 * Browser Sync
 * @description Refresh the Brwoser after File Change.
 */

import config from '../../config.json';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackSettings from '../../webpack/webpack.dev.config.babel';

import yargs from 'yargs';
const argv = yargs.argv;
const env = argv.env || 'development';

if(env === 'development') {
  const bundler = webpack(webpackSettings);

  const browserSyncTask = () => {
    browserSync({
      proxy: config.proxy,
      ghostMode: {
        clicks: true,
        forms: true,
        scroll: false,
      },
      logLevel: 'info',
      watchTask: true,
      open: false,
      stream: true,
      ui: {
        port: 8090,
      },
      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: webpackSettings.output.publicPath,
          stats: {
            colors: true
          }
        }),
        webpackHotMiddleware(bundler)
      ],
      files: [
        config.dist.views + '**/*.{php,html,twig}',
        config.dist.dist + config.dist.images.base + '**/*.{jpg,png,gif,svg}',
        config.dist.dist + config.dist.css + '**/*.css',
      ]
    })
  }


  const browserSyncReload = () => {
    browserSync.reload();
  }

  gulp.task('browser-sync', browserSyncTask);
  gulp.task('bs-reload', browserSyncReload);

  module.exports = { browserSyncTask, browserSyncReload }
}
