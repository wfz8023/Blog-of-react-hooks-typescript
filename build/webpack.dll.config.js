const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: {
        vendor: ['react', "react-dom", 'react-router-dom', 'redux', 'react-redux']
    },
    output: {
        path: path.resolve(__dirname, '../public/dll'),
        filename: "[name].dll.js",
        library: '[name]_library',
    },
    plugins: [
        new CleanWebpackPlugin({
            // 每次运行时清空之前的 dll 文件
            cleanOnceBeforeBuildPatterns: [path.join(__dirname, '../public/dll/**/*')]
        }),
        new webpack.DllPlugin({
            // path 指定manifest文件的输出路径
            path: path.resolve(__dirname, '../public/dll/[name].mainfest.json'),
            // 和library 一致，输出的manifest.json中的name值
            name: '[name]_library',
            // context: __dirname
        })
    ]
};
