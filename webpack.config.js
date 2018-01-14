var path = require('path');
var node_dir = __dirname + '/node_modules';
var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['./src/main/js/app.js', './src/main/scss/main.scss'],
    devtool: 'sourcemaps',
    cache: true,
    resolve: {
        alias: {
            'stompjs': node_dir + '/stompjs/lib/stomp.js',
        }
    },
    output: {
        filename: './src/main/resources/static/built/bundle.js',
        path: __dirname
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            },
            { // css / sass / scss loader for webpack
                test: /\.(css|sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                })
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new ExtractTextPlugin({ // define where to save the file
            filename: './src/main/resources/static/built/bundle.css',
            allChunks: true,
        })
    ]
};