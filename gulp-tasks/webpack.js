'use strict';

var ora = require('ora'); //实现node.js 命令行环境的 loading效果， 和显示各种状态的图标等
var rm = require('rimraf');
var path = require('path');
var chalk = require('chalk'); //使用 chalk 模块美化命令行输出
var webpack = require('webpack');
var extend = require('extend'); //对象的合并

module.exports = function() {
    var config = extend(this.opts, require('./config/utils.tool')(this.opts)); //加载编译vue2的配置
    // console.log(config);
    // process.exit();
    var webpackConfig = require('./webpack-config/webpack.config')(config);
    var spinner = ora('building for development...')
    if (config.env == 'production') {
        spinner = ora('building for production...')
    }
    spinner.start()
    rm(path.join(config[config.env]['assetsRoot'], config[config.env]['assetsSubDirectory']), err => {
        if (err) throw err
        webpack(webpackConfig, function(err, stats) {
            spinner.stop()
            if (err) throw err
            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + '\n\n')

            console.log(chalk.cyan('  Build complete.\n'))
        })
    })
};