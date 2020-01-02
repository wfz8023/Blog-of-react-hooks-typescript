const path = require('path');
// const paths = require('./config/paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin }= require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDevMode = process.argv.indexOf('production') < 1;

module.exports = {
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: "js/main.[hash:8].js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            favicon: path.resolve(__dirname, "../public/favicon.ico"),
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:8].css',
            chunkFilename: 'css/[name].[hash:10].css'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.[jt]sx?/,
                include: path.resolve(__dirname, '../src'),
                use: ['babel-loader']
            },
            {
                enforce: 'pre',           // 在webpack编译之前进行检测
                test: /\.tsx?/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                include: path.resolve(__dirname, '../src'),
            },
            {
                test: /\.(s?css|sass)/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: isDevMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: {
                                localIdentName: '_[name]_[local]_[hash:base64:6]'
                            },// 开启模块化,
                        }
                    }, "postcss-loader", 'sass-loader',
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, '../src/assets/images'),
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'images/[name].[hash].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx", ".json", "*"]
    }
};
