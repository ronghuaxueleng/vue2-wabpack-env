'use strict';
var gulp = require("gulp");
var path = require("path");
var extend = require('extend');
var minimist = require('minimist');
var glob = require('glob');

//接收命令行传递的参数，可传递的参数production、development，默认是development
var knownOptions = {
    string: 'env',
    default: { env: process.env.NODE_ENV || 'development' }
};

var options = minimist(process.argv.slice(2), knownOptions);


var config = {
    base: path.join(__dirname), //项目根目录
    env: options.env, //编译环境
    exts: ['.jscript'],
    pkg: require('./package.json'), //package.json内容
    version: "0.01", //版本号（这里可以省略，直接从pkg中读取即可）
    source: path.join(__dirname, 'resources/assets'), //要编译的VUE源码根目录
    test: path.join(__dirname, 'test'), //测试目录
    dist: path.join(__dirname, 'public'), //编译后的目录
    assets_custom_static: path.join(__dirname, 'resources/assets/static'), //静态文件目录
    assets_sub_directory: '', //
    assets_public_path: '/' //编译后根目录
};


config['entries_path'] = [config.source + '/js/app/app.js'];

var envConfig = require('./gulp-tasks/config/index.config')(config); //获取配置
require('gulp-task-loader')(extend(config, envConfig));