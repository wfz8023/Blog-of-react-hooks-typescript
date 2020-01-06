const path = require('path');
const baseConfig = require('./webpack.base.config');
const {HotModuleReplacementPlugin} = require('webpack');
const webpackMerge = require('webpack-merge');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayWebpackPlugin = require('error-overlay-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');


const devConfig = {
    mode: "development",
    devtool: "source-map",
    // devtool: "cheap-module-eval-source-map",
    devServer: {
        host: 'localhost',
        port: 3000,
        historyApiFallback: true,
        inline : true,
        hot: true,
        contentBase:'../dist'
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new ErrorOverlayWebpackPlugin(),
        new WatchMissingNodeModulesPlugin(path.resolve(__dirname, '../node_modules')),
        new ModuleNotFoundPlugin(path.resolve(__dirname, '.')),
    ]
};
module.exports = webpackMerge(baseConfig, devConfig);
