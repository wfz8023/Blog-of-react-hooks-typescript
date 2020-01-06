const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

const path = require('path');
// const paths = require('./config/paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin }= require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin= require('terser-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const isDevMode = process.argv.indexOf('production') < 1;

module.exports = {
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: {
        path: path.resolve(__dirname, '../dist/'),
        //hash最好不要再生产环境中使用，contenthash内容变换时才会生成文件
        filename: isDevMode ? "js/main.[hash:8].js" : "js/main.[contenthash].js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            favicon: path.resolve(__dirname, "../public/favicon.ico"),
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: isDevMode ? 'css/style.css' : 'css/[name].[contenthash].css',
            chunkFilename: isDevMode ? 'css/style.[id].css' : 'css/[name].[contenthash].[id].css'
        }),
        new HappyPack({
            //唯一标识
            id: 'happyBabel',
            //开启几个子进程处理该类型文件，默认3个，类型必须为整数
            threads: 3,
            //共享进程池
            threadPool: happyThreadPool,
            //是否允许输出日志，默认true
            verbose: true,
            //启用debug 用于故障排查。默认 false
            debug: isDevMode,
            //与webpack中loader配置一样
            loaders:[
                {
                    loader: 'babel-loader?cacheDirectory=true'
                }
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.[jt]sx?/,
                include: path.resolve(__dirname, '../src'),
                //把对 /\.[jt]sx?/ 的文件处理交给id为happyBabel 的HappyPack 的实例执行
                loader: 'happypack/loader?id=happyBabel'
                // use: ['babel-loader']
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
                include: path.resolve(__dirname, '../src'),
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
                ],
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
    optimization:{
        minimize: true,
        minimizer: [
            new TerserPlugin({
                cache: true, //默认为true
                // parallel: true, //默认为true
                parallel: 4,// 开启多进程压缩
                // sourceMap: true,
                terserOptions:{
                    compress:{
                        // warnings: true,
                        drop_console: true,
                        // drop_debugger: true,
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
            minSize: 30000,//模块超过30k 就被分离成公共模块，
            minChunks: 2, //被引用>=2 次就被分割
            automaticNameDelimiter: '~',
            name: true,//默认 模块名+hash，名称相同时多个模块合并为一个，可以设置function
            cacheGroups: {//配置缓存组
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    priority: 10,
                    reuseExistingChunk: true,//是否复用已存在的模块
                    test: /node_modules\/(.*)\.js/  //只打包初始时依赖的第三方
                    // test: /[\\/]node_modules[\\/]/,
                },
                common: {
                    name: 'common',
                    chunks: 'initial',
                    minChunks: 2,
                    priority: 5,
                    reuseExistingChunk: true
                },
                default: { // 模块缓存规则，设置为false，默认缓存组将禁用
                    minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
                    priority: -20, // 优先级
                    reuseExistingChunk: true, // 默认使用已有的模块
                },
            },
        },
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}`
        }
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx", ".json", "*"]
    }
};
