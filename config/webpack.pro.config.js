const path = require('path');
const baseConfig = require('./webpack.base.config');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin= require('terser-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");


const proConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../public/index.html'),
            favicon : path.resolve(__dirname, '../public/favicon.ico'),
            inject  : true,
            minify  :{
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            }
        }),
        new ScriptExtHtmlWebpackPlugin({
            inline: /runtime\..*\.js$/
        }),
        new webpack.DllReferencePlugin({
            manifest: path.join(__dirname, `../public/vendor.mainfest.json`)
        }),
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, '../public/dll/**/*.js'),
            includeSourcemap: false
        }),
    ],
    optimization:{
        minimize: true,
        minimizer: [
            new TerserPlugin({
                cache: true, //默认为true
                parallel: true, //默认为true
                sourceMap: true,
                terserOptions:{
                    compress:{
                        warnings: true,
                        drop_console: true,
                        drop_debugger: true,
                        pure_funcs: ['console.log'],
                    }
                }
            }),
            new OptimizeCssAssetsWebpackPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorOptions:{
                    parser: safePostCssParser,
                    safe: true,
                    reduceIdents: false,
                    discardComments: {
                        removeAll: true
                    },
                    normalizeUnicode: false
                }
            }),
        ],
        splitChunks:{
            chunks: 'all',
            automaticNameDelimiter: '~',
            // name: true,
            cacheGroups: {//配置缓存组
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    priority: 10,
                    reuseExistingChunk: false,
                    test: /node_modules\/(.*)\.js/  //只打包初始时依赖的第三方
                },
                common: {
                    name: 'common',
                    chunks: 'initial',
                    minChunks: 2,
                    priority: 5,
                    reuseExistingChunk: true
                }
            },
        },
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}`
        }
    }
};

module.exports = webpackMerge(baseConfig, proConfig);
