let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");
let path = require("path");
let routeComponentRegex = /public\/src\/([^\/]+\/?[^\/]+).js$/;
let publicPath = '/dist/';
var fs = require('fs');
var HtmlReplaceCssModulePlugin = require('html-replace-css-module-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname, "src/index.js")
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: "[name].js"
    },
    module: {
        loaders: [{
            test: /\.js[x]?$/,
            loader: 'babel',
            include: [path.resolve(__dirname, 'src')],
            exclude: /node_modules/,
            query: {
                "presets": [
                    "es2015",
                    "stage-0"
                ]
            }
        },
        {
            test: /\.css$/, //'postcss-loader?parser=postcss-scss'
            loader: ExtractTextPlugin.extract('style', ['css', 'postcss'])
        }]
    },
    plugins: [
        new HtmlReplaceCssModulePlugin({
            translate: path.resolve(__dirname, './dist/translate/index.json')
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'views/index.html'),//最终生成的html文件
            template: path.resolve(__dirname, 'index.html')
        }),
        new ExtractTextPlugin("styles/index.css")
    ],

    devtool: 'source-map'
}

