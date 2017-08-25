var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function (config) {
    return {
        assetsPath: function (_path) {
            return path.posix.join(config[config.env]['assetsSubDirectory'], _path);
        },
        cssLoaders: function (options) {
            options = options || {}

            var cssLoader = {
                loader: 'css-loader?minimize',
                options: {
                    minimize: config.env === 'production',
                    sourceMap: options.sourceMap
                }
            }

            // generate loader string to be used with extract text plugin
            function generateLoaders (loader, loaderOptions) {
                var loaders = [cssLoader];
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

            return {
              css: generateLoaders(),
              postcss: generateLoaders(),
              less: generateLoaders('less'),
              sass: generateLoaders('sass', { indentedSyntax: true }),
              scss: generateLoaders('sass'),
              stylus: generateLoaders('stylus'),
              styl: generateLoaders('stylus')
            }
        },
        styleLoaders: function (options) {
            var output = [];
            var loaders = this.cssLoaders(options);
            for (var extension in loaders) {
                var loader = loaders[extension]
                output.push({
                    test: new RegExp('\\.' + extension + '$'),
                    use: loader
                })
            }
            return output
        }
    }
}