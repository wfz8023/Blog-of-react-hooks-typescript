const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const library = {
    "vendor": ["react", "react-dom", "react-router-dom"],
    "redux" : ["redux", "react-redux", "redux-thunk"]
};

module.exports = {
    entry: { ...library },
    output: {
        path: path.resolve(__dirname, '../public/dll'),
        filename: "[name].dll.js",
        library: '[name]_[hash]',
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
            name: '[name]_[hash]',
            // context: __dirname
        })
    ]
};
/*
const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode:"production",
    entry: {
        vendor: [
            // '@babel/polyfill',
            'react',
            'react-dom',
            'react-router',
            'react-router-dom',
        ],
        redux: [
            'redux',
            'react-redux',
            'redux-thunk',
        ],
    },
    devtool: 'source-mapcheap-module-eval-souce-map',
    output: {
        path: path.resolve(__dirname, '../public/dll'),
        filename: "[name].dll.js",
        library: '[name]_library',
//         filename: '[name].dll.js',
//         path: path.join(__dirname, '../app/resource/dll'),
//         library: '[name]_[hash]',
    },
    performance: false,
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(__dirname, '../public/dll')],
            verbose:true,
        }),

        // 使用插件 DllPlugin
        new webpack.DllPlugin({
            //             path: path.resolve(__dirname, '../public/dll/[name].mainfest.json'),
            path: path.join(__dirname, '../public/dll', '[name].manifest.json'),
            // This must match the output.library option above
            name: '[name]_library',
            context: __dirname
        }),


    ]
};
*/
