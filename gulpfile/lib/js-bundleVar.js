import config from '../../config.json';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
//import browserify from 'browserify';
//import babelify from 'babelify';
import yargs from 'yargs';


//import vueify from 'vueify'


const argv = yargs.argv;

const env = argv.env || 'development'

const bundleVar = () => {
    if(env == 'development') {
        return browserify(
            config.src.src + config.src.js.base + config.files.jsApp.srcName,
            {
                debug: true
            }
        )
            .transform(babelify.configure({ presets: ["es2015"]}))

            .transform(vueify)

    } else {
        return browserify(
            config.src.src + config.src.js.base + config.files.jsApp.srcName
        )
            .transform(babelify.configure({ presets: ["es2015"]}))

            .transform(vueify)

    }

    return bundler
}

module.exports = bundleVar;