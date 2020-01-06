const path = require('path');
const baseConfig = require('./webpack.base.config');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// const TerserPlugin= require('terser-webpack-plugin');
// const safePostCssParser = require('postcss-safe-parser');
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const Copy = require('copy-webpack-plugin');
// const dll_library = require('./config/dll_library.json');

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
            },
        }),
        new ScriptExtHtmlWebpackPlugin({
            inline: /runtime\..*\.js$/
        }),
        new webpack.DllReferencePlugin({
            manifest: path.join(__dirname, `../public/dll/vendor.mainfest.json`)
        }),
        new webpack.DllReferencePlugin({
            manifest: path.join(__dirname, `../public/dll/redux.mainfest.json`)
        }),
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, '../public/dll/**/*.js'),
            includeSourcemap: false
        }),
        new BundleAnalyzerPlugin({analyzerMode: 'static'}),
        new Copy([
            { from: '../public/dll', to: '../dist' },
        ]),
    ],
};

module.exports = webpackMerge(baseConfig, proConfig);
